<template>
    <div class="list-item-container">
        <div class="list-item" @click="clicked">
            <p>
                [<span v-html="highlight(type, search)" />]
                <span v-html="highlight(name, search)" />
            </p>
            <p class="subheader">{{`${ipAddress}`}}</p>
            <p class="subheader">{{`${this.clusterName ? `Cluster: ${this.clusterName}` : ''}`}}</p>
        </div>
        <hr />
    </div>
</template>

<script>
    export default {
      props: ['type', 'name', 'clusterName', 'ipAddress', 'search'],
      methods: {
        highlight(searchText, query) {
          query = query.toString().replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
          const check = new RegExp(query, 'ig');

          return searchText.toString().replace(check, matchedText => (`<strong>${matchedText}</strong>`));
        },
        clicked() {
          this.$emit('list-item-clicked', { ipAddress: this.ipAddress, name: this.name });
        },
      },
    };
</script>

<style>
strong {
    color: white;
}
.list-item {
    padding: 10px;
    font-family: inherit;
    font-size: 1.3rem;
    font-weight: 700;
    background-color: inherit;
    transition: all 0.4s;
}

.list-item-container:hover {
    background-color: #333333;
    color: #b7b7b7;
    cursor: pointer;
    transition: all 0.4s;
}

.subheader {
    font-size: 13.5px;
    color: #545454;
    margin-top: 6px;
}
</style>