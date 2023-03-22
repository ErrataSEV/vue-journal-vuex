<template>
    <div class="entry-container mb-3 pointer p-2" @click="$router.push({name: 'entry', params: { id: 10}})">
        <div class="entry-title d-flex">
            <span class="text-success fs-5 fw-bold">17</span>
            <span class="mx-1 fs-5">Marzo</span>
            <span class="mx-2 fw-light">2023</span>
        </div>

        <div class="entry-description">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore cum, dolorem ipsam laboriosam voluptas inventore, rerum repellendus quam voluptate autem officiis adipisci maxime ea placeat voluptatibus voluptatem eius ipsum expedita.
        </div>
    </div>
</template>

<style lang="scss" scoped>
.entry-container {
    border: 1px solid #2C3E50;
    transition: .2s all ease-in;

    &:hover {
        background-color: lighten($color: grey, $amount: 45);
        transition: .2s all ease-in;
    }

    .entry-description {
        font-size: 12px;
    }
}


</style>