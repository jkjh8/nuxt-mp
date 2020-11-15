<template>
  <v-app>
    <v-app-bar
      color="blue-grey darken-4"
      dark
      flat
      app
    >
      <nuxt-link
        to="/"
        class="headline"
        style="text-decoration: none; color: white;"
      >
        <v-icon>mdi-play-network-outline</v-icon>
        MEDIA SERVER
      </nuxt-link>
      <v-spacer />
      <div v-if="$auth.loggedIn">
        <nuxt-link
          to="/user/my-account"
          class="px-3"
          style="text-decoration: none; color: white; font-size: 0.8em;"
        >
          MY ACCOUNT
        </nuxt-link>
        <nuxt-link
          to="/user/logout"
          class="px-3"
          style="text-decoration: none; color: white; font-size: 0.8em;"
        >
          LOGOUT
        </nuxt-link>
      </div>
      <div v-else>
        <nuxt-link
          to="/user/login"
          class="px-3"
          style="text-decoration: none; color: white; font-size: 0.8em;"
        >
          LOGIN
        </nuxt-link>
      </div>

      <template v-slot:extension>
        <v-tabs
          v-model="tab"
          centered
        >
          <v-tabs-slider color="yellow" />
          <v-tab
            v-for="item in items"
            :key="item.link"
            :to="item.link"
          >
            {{ item.item }}
          </v-tab>
        </v-tabs>
      </template>
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      tab: null,
      items: [
        { item: 'home', link: '/' },
        { item: 'playlist', link: '/playlist' },
        { item: 'filelist', link: '/filelist' },
        { item: 'player', link: '/player' },
        { item: 'ipaddress', link: '/ipaddress' }
      ]
    }
  }
}
</script>
