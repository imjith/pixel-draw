var pixel = { props: ['color'],
    template: `<div :class="['pixel', color]"></div>`
}

export default {
    name:'pixel',
   components: pixel
};