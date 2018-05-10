'use strict'

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        loading: false,
        title: 'No title',
        http_api_error: 0,
        current_module: {},
        dark: "",
        modules: [
          {
              id: 'index',
              title: "Index",
              description: "List of all tools",
              icon: 'dashboard',
              indexRoute: "Index"
          },
          {
              id: 'base64encode',
              title: "Base64 Encoder",
              description: "Encode string in base64",
              icon: 'code',
              indexRoute: "Base64Encode"
          },
          {
              id: 'base64decode',
              title: "Base64 Decoder",
              description: "Decode string from base64",
              icon: 'code',
              indexRoute: "Base64Decode"
          },
          {
              id: 'hash',
              title: "Hash string",
              description: "Hash string with many alghorithms available",
              icon: 'fas fa-hashtag',
              indexRoute: "Hash"
          },
          {
              id: 'unix_epoch_live',
              title: "Unix epoch live",
              description: "Watch live the unix epoch",
              icon: 'access_time',
              indexRoute: "UnixEpochLive"
          },
          {
              id: 'discord_webhook',
              title: "Discord webhook",
              description: "Debug and send message with discord webhook",
              icon: 'fab fa-discord',
              indexRoute: "DiscordWebhook"
          },
          {
              id: 'json_viewer',
              title: "JsonViewer",
              description: "Better view for json",
              icon: 'pageview',
              indexRoute: "JsonViewer"
          }
        ],
        alert: {
            color: '',
            text: '',
            enabled: false
        },
        settings_dialog: false
    },
    mutations: {

        SET_LOADING (state, payload) {
            state.loading = payload
        },

        SET_TITLE (state, payload) {
            document.title = payload + " Le_Futuriste's tools"
            state.title = payload
        },

        ADD_HTTP_API_ERROR (state) {
            state.http_api_error = state.http_api_error + 1
        },

        SET_HTTP_API_ERROR (state, payload) {
            state.http_api_error = payload
        },

        ADD_ALERT (state, payload) {
            state.alert = {
                color: payload.color,
                text: payload.text,
                enabled: true
            }
        },

        SET_CURRENT_MODULE (state, payload) {
            state.current_module = payload
            state.title = payload.title
            document.title = payload.title + " - Le_Futuriste's tools"
        },

        SET_DARK (state, payload) {
          state.dark = payload
        },

        DISABLE_ALERT (state, payload) {
            state.alert.enabled = payload
        }
    }
})
