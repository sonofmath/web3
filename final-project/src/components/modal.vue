<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <header class="modal-header">
            <slot name="header">
              <h3>Update Message</h3>
            </slot>
          </header>

          <slot name="modal-body">
            <slot name="body">
              <h3><input type="text"/></h3>
              <button type="button" class="btn btn-primary" @click="close">
                  <b>Update</b>
              </button>
            </slot>
          </slot>

          <slot name="modal-footer">
            <slot name="footer">
              <button class="btn btn-primary" @click="$emit('close')">
                Cancel
              </button>
            </slot>
          </slot>

        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'modal',

  methods: {
    close () {
      this.$emit('close')
    }
  }
}
</script>

<style>
  .modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgb(255, 251, 251);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal {
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
  }

  .modal-header,
  .modal-footer {
    padding: 15px;
    display: flex;
  }

  .modal-header {
    border-bottom: 1px solid #eeeeee;
    color: #4AAE9B;
    justify-content: space-between;
  }

  .modal-footer {
    border-top: 1px solid #eeeeee;
    justify-content: flex-end;
  }

  .modal-body {
    position: relative;
    padding: 20px 10px;
  }

  .btn-close {
    border: none;
    font-size: 20px;
    padding: 20px;
    cursor: pointer;
    font-weight: bold;
    color: #4AAE9B;
    background: transparent;
  }

  .btn-green {
    color: white;
    background: #4AAE9B;
    border: 1px solid #4AAE9B;
    border-radius: 2px;
  }
</style>
