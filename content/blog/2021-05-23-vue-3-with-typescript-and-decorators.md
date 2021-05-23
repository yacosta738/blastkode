---
title: Vue 3 with Typescript and Decorators
path: /vue3-with-ypescript-and-decorators
summary: as
date: 2021-05-23T19:54:13.642Z
author: Yuniel Acosta
tags:
  - IT
categories:
  - IT
draft: false
---
I love Typescript for that I always use Typescript and some decorator libraries on my vue.js projects. It has allowed me to use a class syntax for my components and store files which I feel is easier to read than the normal vue.js javascript syntax. I'll be going through a step by step process on how to achieve this. We will be building a counter component that will allow you to increment/decrement a counter.

First we want to start off by creating a new vue.js project using the Vue CLI. If you haven't already done so, you can easily install the CLI with the following command:

```

```

Next, we are going to create a new vue.js project with the `vue create` command.

```

```

With the latest version of the CLI, you can create a Vue 2 or 3 project. Once you run the `vue create` command, you will be prompted with the following options. We will pick `Manually select features` so that we can create a Typescript project with Vue 3.

```

```

You will be prompted with which features you want to add to the project. For now, we will just add Typescript, Router and Vuex.

```

```

You will be prompted with which version of vue.js you want to use. In this example, we are going to use version 3 but this example should work just fine with version 2 or 3 (expect for how you register Vuex in 2 vs 3).

```

```

Before we start coding, we need to install the libraries that add decorator support to our project. Here is a list of libraries we will be adding:

* [vue-class-component](https://github.com/vuejs/vue-class-component) used to define components which is installed by default when Typescript Vue 3 project created
* [vue-property-decorator](https://github.com/kaorun343/vue-property-decorator) used to define props, watches, etc.
* [vuex-class](https://github.com/ktsn/vuex-class) used to import state, getters, mutations and actions in components
* [vuex-class-modules](https://github.com/gertqin/vuex-class-modules) used to define state, getters, mutations and actions

```

```

If we look at the `Home.vue` view, the generated view already uses `vue-class-component` which uses the `Options` decorator to define a Vue component. Inside the `@Options` decorator, I added the `name` attribute and called this view `Home`. I noticed that if you do not do this, it is much harder to figure out what is what in the Vue tools when inspecting the different components. Also notice how you define a class called `Home` as the default export and extend from `Vue` from the `vue-class-component` library.

```

```

Next we are going to setup the Vuex store. I will create a vuex module so you can see what that looks like using the `vuex-class-modules` libary. This counter example doesn't require a module since it is so simple but most projects increase in complexity pretty quickly where splitting out your stores into modules becomes important.

We will go ahead and create a new store called `counter.ts` under `src/store`. You will notice that we just need to export a default class that extends `VueModule` from `vuex-class-modules`. Inside the class we will create examples of state, getters, mutations and actions.

* State - Inside the class we will add a private level variable called `_count`. All state will be defined as class level variables.
* Getters - I created a getter method called `count` to return the value of the class level variable. All vuex getters will be defined as javascript getters in the class. This getter was not necessary for this simple example but I threw it in there so that you can see examples of a getter.
* Mutations - Two mutations are added, one to add to the counter and one to subtract from the counter. These are just standard methods in the class but need to be decorated with `@Mutation`.
* Actions - Two actions are added, one to add to the counter and one to subtract from the counter. Each method has been defined with `async` since actions are asynchronous functions. These are just standard methods in the class but need to be decorated with `@Action`.

```

```

We now need to register `counter.ts` as a module using Vuex 4 (version 4 is used automatically in a Vue 3 project). Using the new Vuex 4 syntax, we create an empty store with `createStore` and then create a new instance of `Counter` and register it with the module name of `counter`. We will do this in `index.ts` to define the counter module and any subsequent modules we create.

```

```

We are now going to create the counter component. Create a file called `Counter.vue` under `src/components`. We'll start by exporting a class level component. We will use the `@Options` annotation to define the name of the component as `Counter`. Last, we will create a constant that makes a reference to the `counter` Vuex module using the `vuex-class` library.

```

```

We'll add a property to the `Counter` component just as an example of how to use the `@Prop` decorator from the `vue-property-decorator` library. This property serves no real purpose in this example but just gives you an idea on how to use it. There is a way to define the property in the `@Options` decorator but I prefer to use `vue-property-decorator` instead.

```

```

To reference the count in the Vuex state, we can use the namespaced decorator from `vuex-class` to create a private level variable in the component. We can also do the same thing for the getters in Vuex. In both cases, I specified the name of the property in the Vuex store inside the decorator. This is only necessary if the name of the Vuex property differs from private level variable you are creating.

```

```

To reference the actions in the Vuex store, we will use the namespaced decorator again to create private level variables in the component to reference the Vuex actions.

```

```

Last thing to do in the component is to create the template. This is pretty straight forward. We will create an `h1` that displays the passed property, two buttons for adding and subtracting from the counter and two divs to display the counter from the Vuex state and getters.

```

```

The final version of `Counter.vue` should look like this.

```

```

Lastly, we are going to drop in the `Counter` component onto the home page. We will pass the message of `Counter` to the component.

```

```

All you need to do now is run the project.

```

```

Now just go to [](http://localhost:8080/)<http://localhost:8080/>. You can find the example source code [here](https://github.com/davidjamesherzog/vue-typescript-decorators).