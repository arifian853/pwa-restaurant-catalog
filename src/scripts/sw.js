import 'regenerator-runtime'
import CacheHelper from './utils/cache-helper'

// Daftar asset yang akan dicaching
const assetsToCache = [
  './',
  './index.html',
  './favicon.png',
  './app.bundle.js',
  './app.webmanifest',
  './sw.bundle.js'
]

self.addEventListener('install', (event) => {
  console.log('Installing Service Worker ...')
  event.waitUntil(CacheHelper.cachingAppShell([...assetsToCache]))
})

self.addEventListener('activate', (event) => {
  console.log('Activating Service Worker ...')
  event.waitUntil(CacheHelper.deleteOldCache())
})

self.addEventListener('fetch', (event) => {
  console.log(event.request)
  event.respondWith(CacheHelper.revalidateCache(event.request))
})
