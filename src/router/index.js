import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Base64Encode from '@/components/Base64Encode'
import Base64Decode from '@/components/Base64Decode'
import BinaryEncode from '@/components/BinaryEncode'
import BinaryDecode from '@/components/BinaryDecode'
import HexEncode from '@/components/HexEncode'
import HexDecode from '@/components/HexDecode'
import DiscordWebhook from '@/components/DiscordWebhook'
import UnixEpochLive from '@/components/UnixEpochLive'
import StringStatistics from '@/components/StringStatistics'
import RandomGenerator from '@/components/RandomGenerator'
import Hash from '@/components/Hash'
import NotFound from '@/components/NotFound'

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
      path: '/binary_encode',
      name: 'BinaryEncode',
      component: BinaryEncode
    },
    {
      path: '/binary_decode',
      name: 'BinaryDecode',
      component: BinaryDecode
    },
    {
      path: '/hex_encode',
      name: 'HexEncode',
      component: HexEncode
    },
    {
      path: '/hex_decode',
      name: 'HexDecode',
      component: HexDecode
    },
    {
      path: '/hash',
      name: 'Hash',
      component: Hash
    },
    {
      path: '/random_generator',
      name: 'RandomGenerator',
      component: RandomGenerator
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
    },
    {
      path: '/string_statistics',
      name: 'StringStatistics',
      component: StringStatistics
    },
    {
      path: '*',
      component: NotFound
    }
  ]
})
