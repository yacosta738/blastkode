<template>
  <Layout>
    <section id="about-author" class="container mx-auto"  v-scroll-reveal.reset>
      <div class="text-center text-5xl capitalize">
        <h2 class="transition duration-500 ease-in-out font-black tracking-widest m-3 text-lightest-slate">
          {{ $page.author.name.split(" ")[0] }}
          <span class="text-green-500"> {{ $page.author.name.replace($page.author.name.split(" ")[0], "") }}</span></h2>
        <div class="title-underline"></div>
      </div>

      <div class="my-4 text-left" v-html="$page.author.content"></div>


      <div class="flex flex-col md:flex-row justify-center items-center mx-auto my-12">
        <div class="">
          <div class="styled-pic">
            <div class="wrapper">
              <g-image :src="$page.author.image" class="img" :alt="$page.author.name"/>
            </div>
            <div class="flex justify-center my-8 remove-link-css-background">
              <g-link v-for="(social, i) in $page.author.social" :to="social.url" class="" :key="`social-${social.value}-${i}`">
                <i class="flex items-center justify-center h-9 w-9 mx-1 rounded-full bg-light-navy fill-current text-lightest-slate text-xl hover:bg-green-500 hover:text-light-navy">
                  <font-awesome :icon="[social.icon.type, social.icon.value]"/>
                </i>
              </g-link>
            </div>
          </div>
        </div>
        <div class="" data-aos="fade-left">
          <div class="contact-info mx-6">
            <h3 class="font-bold text-3xl text-lightest-slate" v-text="$t('contact-information')">Contact Information</h3>
            <p class="font-thin">
              {{ yearsExperience($page.author.summary) }}
            </p>

            <div class="flex justify-center md:justify-start items-center my-2">
              <ul class="grid grid-cols-1 md:grid-cols-2 gap-1 md:gap-4">
                <li v-for="(contact, i) in $page.author.contact_items" :key="`contact-${i}`">
                    <span>
                    <i class="mx-1 text-lightest-slate">
                      <font-awesome :icon="[contact.icon.type, contact.icon.value]"/>
                    </i>
                    <strong class="mr-3 text-lightest-slate">{{ contact.name }}:</strong>
                    <g-link :to="contact.link" :target="contact.target" class="inline-link">
                         {{ contact.text }}
                    </g-link>
                    </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div id="resume" class="grid grid-cols-1 md:grid-cols-2">
        <resume-timeline v-for="(resume, i) in $page.author.resume" :key="i" :experience="resume.experience"/>
      </div>
    </section>
  </Layout>
</template>

<page-query>
  query Author ($path: String!) {
    author: author (path: $path) {
          id
          name
          image
          lang
          rol
          summary
          contact_items {
            icon {
             type
             value
            }
            name
            link
            text
          }
          social {
            url
            icon {
              type
              value
            }
          }
          resume {
            experience {
              title
              items {
                name
                icon {
                  type
                  value
                }
                start_date
                end_date
                location
                main_activities
              }
            }
          }
          content
    }
}
</page-query>

<script lang="ts">
import {Component, Vue, Watch} from 'vue-property-decorator';
import {yearsOfExperience} from '~/util/utilities';
const ResumeTimeline = () => import("~/components/shared/ResumeTimeline.vue");

@Component({components:{ResumeTimeline}})
export default class Author extends Vue {
  @Watch('$page.author.lang')
  languageChanged(){
    this.$i18n.locale = this.$page.author.lang;
  }
  yearsExperience(text: string): string {
    return yearsOfExperience(text);
  }
}
</script>

<style scoped lang="scss">
.title-underline {
  border-top: 2px solid var(--light-navy);
  height: 1px;
  margin: 15px auto 0;
  position: relative;
  width: 30%;

&:before {
   content: '';
   height: 6px;
   left: 50%;
   margin-left: -20px;
   position: absolute;
   top: -4px;
   width: 50px;
   background-color: var(--green);
 }
}
.styled-pic {
  position: relative;
  max-width: 300px;
  .wrapper {
    box-shadow: 0 10px 30px -15px var(--navy-shadow);
    transition: var(--transition);
    display: block;
    position: relative;
    width: 100%;
    border-radius: 4px;
    background-color: var(--green);
    z-index: 1;
    &:hover {
      box-shadow: 0 20px 30px -15px var(--navy-shadow);
      background: transparent;
      outline: 0;
      &:after {
        top: 15px;
        right: 15px;
      }
      .img {
        filter: none;
        mix-blend-mode: normal;
      }
    }
    &:focus {
      box-shadow: 0 20px 30px -15px var(--navy-shadow);
      background: transparent;
      outline: 0;
      &:after {
        top: 15px;
        right: 15px;
      }
      .img {
        filter: none;
        mix-blend-mode: normal;
      }
    }
    .img {
      overflow: hidden;
      position: relative;
      border-radius: 4px;
      mix-blend-mode: multiply;
      filter: grayscale(100%) contrast(1);
      transition: var(--transition);
    }
    &:before {
      content: '';
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: 4px;
      transition: var(--transition);
      top: 0;
      right: 0;
      background-color: var(--navy);
      mix-blend-mode: screen;
    }
    &:after {
      content: '';
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: 4px;
      transition: var(--transition);
      border: 2px solid var(--green);
      top: 20px;
      right: 20px;
      z-index: -1;
    }
  }
}
.contact-info {
  ul {
    list-style: none;
    padding-left: 1em;
    padding-right: 1em;
  }
  li {
    display: flex;
    margin-bottom: 1em;
    &:before {
      content: '';
      display: none;
    }
  }
  a div {
    display: flex;
    align-items: center;
  }
  .icon {
    width: 2em;
    height: 2em;
  }
}
</style>
