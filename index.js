((d, w) => {

  // class構文テスト
  class User {
    constructor( name, age ) {
      this.name = name;
      this.age = age;
    }
    //名前のddタグ生成
    createName = () => {
      const textBox = d.getElementById('js_name');
      const createParagraph = d.createElement('dd');
      createParagraph.textContent = this.name;
      textBox.appendChild(createParagraph);
    }
    //年齢のddタグ生成
    createAge = () => {
      const textBox = d.getElementById('js_age');
      const createParagraph = d.createElement('dd');
      createParagraph.textContent = this.age;
      textBox.appendChild(createParagraph);
    }
  }

  /**
  * アコーディオン
  */
  class accordion {
  /**
   * @param {string} button ボタン要素のセレクター
   * @param {string} target 開閉要素のセレクター
   * @param {Object} config transition-duration, transition-timing-functionの任意指定
   */
    constructor(button, target, config) {
      // ボタン要素
      this.button = [].slice.call(d.querySelectorAll(button));
      // 開閉する要素
      this.target = [].slice.call(d.querySelectorAll(target));
      // transitionプロパティ
      const duration = '.6s';
      const timing = 'ease';
      this.config = config ? config : {
        transitionDuration: duration,
        transitionTimingFunction: timing,
      }
      if (this.config.transitionDuration === undefined) this.config.transitionDuration = duration;
      if (this.config.transitionTimingFunction === undefined) this.config.transitionTimingFunction = timing;
      // 処理実行
      this.init(this.button, this.target, this.config);
    }

    init(button, target, config) {
      // 開閉要素のスタイル指定
      let targetHeightArray = [];
      target.forEach((target) => {
        targetHeightArray.push(target.scrollHeight);
        target.style.overflow = 'hidden';
        target.style.maxHeight = 0;
        target.style.transitionProperty = 'max-height';
        target.style.transitionDuration = config.transitionDuration;
        target.style.transitionTimingFunction = config.transitionTimingFunction;
      });
      window.addEventListener('resize', () => {
        targetHeightArray = [];
        target.forEach((target) => {
          targetHeightArray.push(target.scrollHeight);
        });
      });

      // 開閉ボタンイベント
      button.forEach((btn,index) => {
        btn.addEventListener('click', () => {
          btn.classList.toggle('is_open');
          if (btn.classList.contains('is_open')) {
            target[index].style.maxHeight = targetHeightArray[index] + 'px';
          } else {
            target[index].style.maxHeight = 0;
          }
        });
      });
    }
  }


// from:https://github.com/jserz/js_piece/blob/master/DOM/ChildNode/remove()/remove().md
(function (arr) {
  arr.forEach(function (item) {
    if (item.hasOwnProperty('remove')) {
      return;
    }
    Object.defineProperty(item, 'remove', {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function remove() {
        if (this.parentNode !== null)
          this.parentNode.removeChild(this);
      }
    });
  });
})([Element.prototype, CharacterData.prototype, DocumentType.prototype]);


  /**
  * ポップアップ
  */
  class modal {
    /**
     * @param {string} wrapper モーダル要素を囲むセレクター
     * @param {Object} config モーダル要素の種類 type:image, video, iframe
     */
    constructor(wrapper,config) {
      this.wrapper = [].slice.call(document.querySelectorAll(wrapper));
      const dataElement = '[data-modal]';
      this.target = [].slice.call(document.querySelectorAll(wrapper + ' ' + dataElement));
      this.item = [];
      this.target.forEach((item) => {
        this.item.push(item.dataset.modal);
      });
      this.config = config ? config : {
        type: 'image'
      };
      this.toggleModal(this.wrapper, this.target, this.item, this.config);
    }

    toggleModal(wrapper, target, item, config) {
      // モーダル準備
      const createModal = document.createElement('div');
      createModal.setAttribute('id', 'js_modal');
      createModal.setAttribute('class', 'modal');
      // モーダルコンテンツ準備
      const createModalContents = document.createElement('div');
      createModalContents.setAttribute('id', 'js_modal_contents');
      createModalContents.setAttribute('class', 'modal_contents');
      // typeに合わせた要素
      let createItem;
      if (config.type === 'image') {
        createItem = document.createElement('img');
      } else if (config.type === 'video') {
        createItem = document.createElement('video');
        createItem.setAttribute('muted', '');
        createItem.setAttribute('autoplay', '');
        createItem.setAttribute('loop', '');
        createItem.setAttribute('controls', '');
        createModalContents.classList.add('hp_video');
      } else if (config.type === 'iframe') {
        createItem = document.createElement('iframe');
        createModalContents.classList.add('hp_video');
      }
      // 閉じるボタン準備
      const createClose = document.createElement('a');
      createClose.setAttribute('id', 'js_modal_close');
      createClose.setAttribute('class', 'modal_close');

      target.forEach((target) => {
        target.addEventListener('click', () => {
          // モーダル要素生成
          document.body.appendChild(createModal);
          createModal.appendChild(createClose);
          const modal = document.getElementById('js_modal');
          const modalClose = document.getElementById('js_modal_close');
          modal.appendChild(createModalContents);
          createItem.setAttribute('id', 'js_modal_item');
          createItem.setAttribute('class', 'modal_item');
          createItem.setAttribute('src', target.dataset.modal);
          createModalContents.appendChild(createItem);

          // モーダルを閉じる処理
          const closeButton = modal || modalClose;
          const userAgent = window.navigator.userAgent.toLowerCase();
          closeButton.addEventListener('click', () => {
            if (userAgent.indexOf('trident/7') !== -1) {
              document.body.removeChild(modal);
            } else {
              modal.remove();
            }
          });
          // モーダルコンテンツ内のクリックイベント無効化
          const modalContents = document.getElementById('js_modal_contents');
          modalContents.addEventListener('click', (e) => {
            e.stopPropagation();
          });
        });
      });
    }
  }

  // 実行
  w.addEventListener('load', () => {
    const taro = new User('田中太郎', 20);
    taro.createName();
    taro.createAge();

    const firstList = new accordion('.js_accordion > .js_accordionButton', '.js_accordion > .js_accordionTarget', {
      transitionDuration: '1s',
    });
    const secondList = new accordion('.js_accordion2 > .js_accordionButton', '.js_accordion2 > .js_accordionTarget');
    const thirdList = new accordion('.js_accordion3', '.js_accordionTarget3', {
      transitionTimingFunction: 'cubic-bezier(0.175, 0.885, 0.320, 1.275)'
    });

    const popUpItem = new modal('.js_popUp');
    const popUpvideo = new modal('.js_popUpVideo', {
      type: 'video'
    });
    const popUpiframe = new modal('.js_popUpIframe', {
      type: 'iframe'
    });
  });
})(document, window);
