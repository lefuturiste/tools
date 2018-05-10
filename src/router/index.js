import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Base64Encode from '@/components/Base64Encode'
import Base64Decode from '@/components/Base64Decode'
import DiscordWebhook from '@/components/DiscordWebhook'
import UnixEpochLive from '@/components/UnixEpochLive'
import Hash from '@/components/Hash'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/base64encode',
      name: 'Base64Encode',
      component: Base64Encode
    },
    {
      path: '/base64decode',
      name: 'Base64Decode',
      component: Base64Decode
    },
    {
      path: '/hash',
      name: 'Hash',
      component: Hash
    },
    {
      path: '/unix_epoch_live',
      name: 'UnixEpochLive',
      component: UnixEpochLive
    },
    {
      path: '/discord_webhook',
      name: 'DiscordWebhook',
      component: DiscordWebhook
    }
  ]
})
