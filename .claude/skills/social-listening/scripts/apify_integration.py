#!/usr/bin/env python3
"""
Apify Integration for Social Listening Skill
=============================================
Usage:
    python3 apify_integration.py --client conrado-laboral --token YOUR_TOKEN
    python3 apify_integration.py --client conrado-laboral --token YOUR_TOKEN --run  # Also triggers runs
    python3 apify_integration.py --client conrado-laboral --token YOUR_TOKEN --latest  # Just pull latest data

This script:
1. Finds all Apify tasks matching the client prefix (e.g., conrado-laboral-*)
2. Optionally runs them and waits for completion
3. Downloads the latest dataset from each task
4. Normalizes all data to a unified mention format
5. Outputs a merged JSON file ready for the skill's analysis + report pipeline
"""

import argparse
import json
import time
import sys
import os
from datetime import datetime
from urllib.request import urlopen, Request
from urllib.error import URLError

API_BASE = "https://api.apify.com/v2"

def api_get(path, token):
    url = f"{API_BASE}/{path}{'&' if '?' in path else '?'}token={token}"
    try:
        req = Request(url)
        with urlopen(req, timeout=30) as resp:
            return json.loads(resp.read())
    except Exception as e:
        print(f"  ⚠️ API error: {e}")
        return {}

def api_post(path, token, data=None):
    url = f"{API_BASE}/{path}?token={token}"
    try:
        body = json.dumps(data).encode() if data else None
        req = Request(url, data=body, method='POST')
        req.add_header('Content-Type', 'application/json')
        with urlopen(req, timeout=60) as resp:
            return json.loads(resp.read())
    except Exception as e:
        print(f"  ⚠️ API error: {e}")
        return {}

def find_client_tasks(token, client_prefix):
    """Find all tasks matching client-* pattern"""
    resp = api_get("actor-tasks?limit=100", token)
    items = resp.get('data', {}).get('items', [])
    tasks = [t for t in items if t.get('name', '').startswith(client_prefix)]
    return tasks

def get_latest_run(token, task_id):
    """Get the most recent successful run for a task"""
    resp = api_get(f"actor-tasks/{task_id}/runs?limit=1&status=SUCCEEDED", token)
    items = resp.get('data', {}).get('items', [])
    return items[0] if items else None

def run_task(token, task_id):
    """Trigger a task run and return the run info"""
    resp = api_post(f"actor-tasks/{task_id}/runs", token)
    return resp.get('data', {})

def wait_for_run(token, run_id, max_wait=300):
    """Wait for a run to complete"""
    elapsed = 0
    while elapsed < max_wait:
        resp = api_get(f"actor-runs/{run_id}", token)
        status = resp.get('data', {}).get('status', '')
        if status == 'SUCCEEDED':
            return resp.get('data', {})
        elif status in ('FAILED', 'ABORTED', 'TIMED-OUT'):
            print(f"  ❌ Run {run_id} failed with status: {status}")
            return None
        print(f"  ⏳ Status: {status} ({elapsed}s)")
        time.sleep(10)
        elapsed += 10
    print(f"  ⚠️ Timeout waiting for run {run_id}")
    return None

def download_dataset(token, dataset_id, limit=500):
    """Download all items from a dataset"""
    resp = api_get(f"datasets/{dataset_id}/items?format=json&limit={limit}", token)
    if isinstance(resp, list):
        return resp
    return []

def detect_platform(task_name):
    """Detect platform from task name"""
    name = task_name.lower()
    if 'facebook' in name: return 'facebook'
    if 'instagram' in name: return 'instagram'
    if 'youtube' in name: return 'youtube'
    if 'twitter' in name or 'tweet' in name: return 'twitter'
    return 'unknown'

def normalize_mention(item, platform, task_name):
    """Normalize a raw data item to the unified mention schema"""
    m = {
        'platform': platform,
        'source_task': task_name,
        'content': '',
        'url': '',
        'date': '',
        'author': '',
        'source_name': '',
        'likes': 0,
        'comments': 0,
        'shares': 0,
        'views': 0,
        'reach': 0,
    }

    if platform == 'instagram':
        m['content'] = item.get('caption', '') or ''
        m['url'] = item.get('url', '')
        m['date'] = item.get('timestamp', '')
        m['author'] = item.get('ownerUsername', '')
        m['source_name'] = f"@{item.get('ownerUsername', '')}"
        m['likes'] = item.get('likesCount', 0) or 0
        m['comments'] = item.get('commentsCount', 0) or 0
        m['views'] = item.get('videoPlayCount', 0) or item.get('videoViewCount', 0) or 0
        m['content_type'] = item.get('productType', item.get('type', ''))
        m['hashtags'] = item.get('hashtags', [])

    elif platform == 'facebook':
        m['content'] = item.get('postText', '') or item.get('text', '') or item.get('message', '') or ''
        m['url'] = item.get('url', '') or item.get('postUrl', '')
        m['date'] = item.get('timestamp', '') or item.get('publishedAt', '') or item.get('time', '')
        m['author'] = item.get('authorName', '') or item.get('pageName', '') or item.get('user', {}).get('name', '') or ''
        m['source_name'] = m['author']
        m['likes'] = item.get('likes', 0) or item.get('reactions', 0) or item.get('likesCount', 0) or 0
        m['comments'] = item.get('comments', 0) or item.get('commentsCount', 0) or 0
        m['shares'] = item.get('shares', 0) or item.get('sharesCount', 0) or 0

    elif platform == 'youtube':
        m['content'] = f"{item.get('title', '')} - {item.get('description', '')}"
        m['url'] = item.get('url', '') or item.get('link', '')
        m['date'] = item.get('date', '') or item.get('uploadDate', '') or item.get('publishedAt', '')
        m['author'] = item.get('channelName', '') or item.get('channel', '')
        m['source_name'] = m['author']
        m['likes'] = item.get('likes', 0) or item.get('likesCount', 0) or 0
        m['comments'] = item.get('commentCount', 0) or item.get('commentsCount', 0) or 0
        m['views'] = item.get('viewCount', 0) or item.get('views', 0) or 0

    elif platform == 'twitter':
        m['content'] = item.get('full_text', '') or item.get('text', '') or item.get('tweet', '') or ''
        m['url'] = item.get('url', '') or item.get('tweetUrl', '')
        m['date'] = item.get('created_at', '') or item.get('createdAt', '') or item.get('timestamp', '')
        user = item.get('user', {}) if isinstance(item.get('user'), dict) else {}
        m['author'] = user.get('screen_name', '') or item.get('author', '') or item.get('username', '')
        m['source_name'] = f"@{m['author']}" if m['author'] else ''
        m['likes'] = item.get('favorite_count', 0) or item.get('likeCount', 0) or item.get('favoriteCount', 0) or 0
        m['comments'] = item.get('reply_count', 0) or item.get('replyCount', 0) or 0
        m['shares'] = item.get('retweet_count', 0) or item.get('retweetCount', 0) or 0
        followers = user.get('followers_count', 0) or item.get('followersCount', 0) or 0
        m['reach'] = followers

    # Clean up
    if isinstance(m['content'], str):
        m['content'] = m['content'].strip()[:1000]  # Cap at 1000 chars

    # Force numeric types (some APIs return dicts or strings)
    for field in ['likes', 'comments', 'shares', 'views', 'reach']:
        val = m[field]
        if isinstance(val, dict):
            m[field] = val.get('count', 0) or val.get('total', 0) or 0
        elif isinstance(val, str):
            try:
                m[field] = int(val.replace(',', ''))
            except:
                m[field] = 0
        elif val is None:
            m[field] = 0

    m['interactions'] = int(m['likes'] or 0) + int(m['comments'] or 0) + int(m['shares'] or 0)

    return m

def main():
    parser = argparse.ArgumentParser(description='Apify Social Listening Integration')
    parser.add_argument('--client', required=True, help='Client prefix (e.g., conrado-laboral)')
    parser.add_argument('--token', required=True, help='Apify API token')
    parser.add_argument('--run', action='store_true', help='Trigger new runs before downloading')
    parser.add_argument('--latest', action='store_true', help='Just pull latest data')
    parser.add_argument('--output', default=None, help='Output JSON path')
    args = parser.parse_args()

    output_path = args.output or f"./{args.client}_mentions.json"

    print(f"\n🔍 Buscando tareas para cliente: {args.client}")
    tasks = find_client_tasks(args.token, args.client)

    if not tasks:
        print(f"❌ No se encontraron tareas con prefijo '{args.client}'")
        sys.exit(1)

    print(f"📋 {len(tasks)} tareas encontradas:")
    for t in tasks:
        platform = detect_platform(t['name'])
        print(f"  {platform.upper():12s} → {t['name']} (ID: {t['id']})")

    all_mentions = []
    stats = {}

    for task in tasks:
        platform = detect_platform(task['name'])
        print(f"\n{'='*50}")
        print(f"📡 {platform.upper()} — {task['name']}")

        if args.run:
            print(f"  🚀 Ejecutando tarea...")
            run = run_task(args.token, task['id'])
            if run and run.get('id'):
                print(f"  Run ID: {run['id']}")
                result = wait_for_run(args.token, run['id'])
                if result:
                    dataset_id = result.get('defaultDatasetId', '')
                else:
                    print(f"  ⚠️ No se pudo completar el run")
                    stats[platform] = {'status': 'FAILED', 'mentions': 0}
                    continue
            else:
                print(f"  ⚠️ No se pudo iniciar el run")
                stats[platform] = {'status': 'FAILED', 'mentions': 0}
                continue
        else:
            # Get latest successful run
            run = get_latest_run(args.token, task['id'])
            if not run:
                print(f"  ⚠️ No hay runs previos exitosos")
                stats[platform] = {'status': 'NO_DATA', 'mentions': 0}
                continue
            dataset_id = run.get('defaultDatasetId', '')
            print(f"  📦 Último run: {run.get('startedAt', '')[:16]} | Dataset: {dataset_id}")

        # Download data
        print(f"  ⬇️ Descargando datos...")
        items = download_dataset(args.token, dataset_id)
        print(f"  📊 {len(items)} items descargados")

        # Normalize
        mentions = []
        for item in items:
            m = normalize_mention(item, platform, task['name'])
            if m['content']:  # Only keep mentions with content
                mentions.append(m)

        all_mentions.extend(mentions)
        stats[platform] = {
            'status': 'OK',
            'raw_items': len(items),
            'mentions': len(mentions),
            'dataset_id': dataset_id,
        }
        print(f"  ✅ {len(mentions)} menciones normalizadas")

    # Sort by date
    all_mentions.sort(key=lambda x: x.get('date', ''), reverse=True)

    # Summary
    print(f"\n{'='*50}")
    print(f"📊 RESUMEN")
    print(f"  Total menciones: {len(all_mentions)}")
    for platform, s in stats.items():
        print(f"  {platform.upper():12s}: {s['mentions']} menciones ({s['status']})")

    # Save
    output = {
        'client': args.client,
        'generated_at': datetime.now().isoformat(),
        'stats': stats,
        'total_mentions': len(all_mentions),
        'mentions': all_mentions,
    }

    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(output, f, ensure_ascii=False, indent=2, default=str)

    print(f"\n💾 Guardado en: {output_path}")
    print(f"✅ Listo para procesar con el skill de social listening")

if __name__ == '__main__':
    main()
