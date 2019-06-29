import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: () => import( /* webpackChunkName: "index" */ './components/Index.vue')
    },
    {
      path: '/base64encode',
      name: 'Base64Encode',
      component: () => import( /* webpackChunkName: "base64Encode" */ './components/Base64Encode.vue')
    },
    {
      path: '/base64decode',
      name: 'Base64Decode',
      component: () => import( /* webpackChunkName: "base64Decode" */ './components/Base64Decode.vue')
    },
    {
      path: '/url_encode',
      name: 'UrlEncode',
      component: () => import( /* webpackChunkName: "urlEncode" */ './components/UrlEncode.vue')
    },
    {
      path: '/url_decode',
      name: 'UrlDecode',
      component: () => import( /* webpackChunkName: "urlDecode" */ './components/UrlDecode.vue')
    },
    {
      path: '/binary_encode',
      name: 'BinaryEncode',
      component: () => import( /* webpackChunkName: "binaryEncode" */ './components/BinaryEncode.vue')
    },
    {
      path: '/binary_decode',
      name: 'BinaryDecode',
      component: () => import( /* webpackChunkName: "binaryDecode" */ './components/BinaryDecode.vue')
    },
    {
      path: '/hex_encode',
      name: 'HexEncode',
      component: () => import( /* webpackChunkName: "hexEncode" */ './components/HexEncode.vue')
    },
    {
      path: '/hex_decode',
      name: 'HexDecode',
      component: () => import( /* webpackChunkName: "hexDecode" */ './components/HexDecode.vue')
    },
    {
      path: '/hash',
      name: 'Hash',
      component: () => import( /* webpackChunkName: "hash" */ './components/Hash.vue')
    },
    {
      path: '/random_generator',
      name: 'RandomGenerator',
      component: () => import( /* webpackChunkName: "randomGenerator" */ './components/RandomGenerator.vue')
    },
    {
      path: '/unix_epoch_live',
      name: 'UnixEpochLive',
      component: () => import( /* webpackChunkName: "unixEpochLive" */ './components/UnixEpochLive.vue')
    },
    {
      path: '/discord_webhook',
      name: 'DiscordWebhook',
      component: () => import( /* webpackChunkName: "discordWebhook" */ './components/DiscordWebhook.vue')
    },
    {
      path: '/string_statistics',
      name: 'StringStatistics',
      component: () => import( /* webpackChunkName: "stringStatistics" */ './components/StringStatistics.vue')
    },
    {
      path: '/qrcode_generator',
      name: 'QrCodeGenerator',
      component: () => import( /* webpackChunkName: "qrcodeGenerator" */ './components/QrCodeGenerator.vue')
    },
    {
      path: '/gravatar',
      name: 'Gravatar',
      component: () => import( /* webpackChunkName: "gravatar" */ './components/Gravatar.vue')
    },
    {
      path: '/image_resize',
      name: 'ImageResize',
      component: () => import( /* webpackChunkName: "imageResize" */ './components/ImageResize.vue')
    },
    {
      path: '*',
      component: () => import( /* webpackChunkName: "notFound" */ './components/NotFound.vue')
    }
  ]
})
