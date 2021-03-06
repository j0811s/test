
require('intersection-observer'); //https://github.com/w3c/IntersectionObserver/tree/master/polyfill
import objectFitImages from 'object-fit-images';
objectFitImages(); //https://github.com/fregante/object-fit-images

((d, w) => {

  
  /**
   * @param  {String} element セレクター
   * @param  {Object} callback forEachによるコールバック
   */
  const sliceCall = (element, callback) => {
    return [].slice.call(element).forEach(callback);
  }

  
  (() => {
    const tab = d.querySelectorAll('.js-tab_item');
    const contents = d.querySelectorAll('.js-panel');

    sliceCall(tab, (tabItem, index) => {
      tabItem.addEventListener('click', (e) => {
        // タブ
        for (let i = 0; i < tab.length; i++) {
          tab[i].classList.remove('is-active');
        }
        tabItem.classList.add('is-active');
        
        // コンテンツ
        for (let i = 0; i < contents.length; i++) {
          contents[i].classList.remove('is-active');
        }
        contents[index].classList.add('is-active');
      });
    });
  })();



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
      this.process(this.button, this.target, this.config);
    }

    process(button, target, config) {
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

      // 開閉ボタンイベント
      button.forEach((btn,index) => {
        btn.addEventListener('click', () => {
          btn.classList.toggle('is_open');

          if (btn.classList.contains('is_open')) {
            // setOverflow();
            target[index].style.maxHeight = targetHeightArray[index] + 'px';
          } else {
            target[index].style.maxHeight = 0;
          }
        });
      });


      //リサイズ
      window.addEventListener('resize', () => {
        targetHeightArray = [];
        target.forEach((target) => {
          targetHeightArray.push(target.scrollHeight);
        });

        for (let i = 0; i < button.length; i++) {
          button[i].classList.remove('is_open');
          target[i].style.maxHeight = 0;
        }
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
    this.target = [].slice.call(document.querySelectorAll(wrapper + ' ' + '[data-modal]'));
    this.config = config ? config : {
      type: 'image',
      alt: ['']
    };
    this.toggleModal(this.target, this.config);
  }

  toggleModal(target, config) {
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

    target.forEach((target,index) => {
      target.addEventListener('click', () => {
        // モーダル要素生成
        document.body.appendChild(createModal);
        createModal.appendChild(createClose);
        const modal = document.getElementById('js_modal');
        const modalClose = document.getElementById('js_modal_close');
        modal.appendChild(createModalContents);
        // モーダルコンテンツ生成
        createItem.setAttribute('id', 'js_modal_item');
        createItem.setAttribute('class', 'modal_item');
        createItem.setAttribute('src', target.dataset.modal); // src設定
        if (config.type === 'image' && config.alt[index] === undefined) config.alt[index] = ''; // altがundefinedなら空文字
        if (config.type === 'image') createItem.setAttribute('alt', config.alt[index]); // type:imageならalt設定
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

class countDown {
  /**
  * カウントダウン
  * @param {string} target カウントダウンを表示するセレクター (例. '.js-countDown')
  * @param {string} start 開始日時 (例. '2020/4/21 00:00:00')
  * @param {string} end 終了日時 (例. '2020/4/24 12:00:00')
  * @param {string} finishTarget カウントダウン終了時のadd-hide付け替えセレクター (例. '.js-countDown_finish')
  */
  constructor(target, start, end, finishTarget = null) {
    this.target = document.querySelector(target);
    this.start = start;
    this.end = end;
    this.finishElement = [];
    this.finishElement.slice.call(document.querySelectorAll(finishTarget)).forEach((ele) => {
      this.finishElement.push(ele);
    });
    this.setCountDown();
  }

  setCountDown() { //カウントダウン処理
    let timerId;
    timerId = setInterval(() => {
      const addZero = (num) => { //1桁にならないように0を追加
        return ('0' + num).slice(-2);
      }
      const addZeroDay = (num) => { return ('0' + num).slice(-3); };
      const targetElement = this.target; //表示対象
      const nowDate = new Date(); //現在時刻
      let startDate = new Date(this.start); //開始時間
      let endDate = new Date(this.end); //終了時間
      let period = endDate - nowDate; //残り時間
      let day = 0; //日
      let h = 0; //時
      let m = 0; //分
      let s = 0; //秒
      if (nowDate > startDate) { //開始時間を過ぎていれば時刻設定
        if (period >= 0) {
          day = Math.floor(period / (1000 * 60 * 60 * 24));
          period -= (day　*(1000 * 60 * 60 * 24));
          h = Math.floor(period / (1000 * 60 * 60));
          period -= (h * (1000 * 60 * 60));
          m = Math.floor(period / (1000 * 60));
          period -= (m * (1000 * 60));
          s = Math.floor(period / 1000);
          targetElement.innerHTML = day + '日 ' + addZero(h) + ':' + addZero(m) + ':' + addZero(s);
        }
      } else {
        targetElement.style.display = 'none';
        clearInterval(timerId);
      }

      if (nowDate > endDate) { //残り時間が終了時間を過ぎた時
        targetElement.parentNode.removeChild(targetElement);
        this.finishElement.forEach((ele) => {
          ele.classList.toggle('add-hide')
        });
        clearInterval(timerId);
      }
    }, 1000);
  }
}
  
  /**
   * スムーススクロール
   * @param  {Number} duration  スクロールにかかる時間
   * @param  {Number} gap  スクロール停止位置の間隔 (固定ナビゲーションの高さなどに)
   * @param  {String} easingType  イージングの種類
   */
  const smoothScroll = (duration = 600, gap = 0, easingType = 'easeInOutCubic') => {
    const easing = {
      /**
       * @param  {Number} t  current time
       * @param  {Number} b  beginning value
       * @param  {Number} c  change in value
       * @param  {Number} d  duration
       */
      linear: (t, b, c, d) => {
        return c * t / d + b;
      },
      easeInQuad: (t, b, c, d) => {
        return c * (t /= d) * t + b;
      },
      easeOutQuad: (t, b, c, d) =>  {
        return -c * (t /= d) * (t - 2) + b;
      },
      easeInOutQuad: (t, b, c, d) =>  {
        if ((t /= d / 2) < 1) return c / 2 * t * t + b;
        return -c / 2 * ((--t) * (t - 2) - 1) + b;
      },
      easeInCubic: (t, b, c, d) =>  {
        return c * (t /= d) * t * t + b;
      },
      easeOutCubic: (t, b, c, d) =>  {
        return c * ((t = t / d - 1) * t * t + 1) + b;
      },
      easeInOutCubic: (t, b, c, d) =>  {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t + 2) + b;
      }
    }

    const ignore = '.js-noSmooth'; //スムーススクロールを対象外にしたい要素につけるクラス
    const targetButton = d.querySelectorAll(`a[href^="#"]:not(${ignore})`);

    [].slice.call(targetButton).forEach((targetButton) => {
      targetButton.addEventListener('click', (e) => {
        e.preventDefault();
        const href = targetButton.getAttribute('href');
        const target = d.querySelector(href == '#' ? 'html' : href);
        const scrollTop = w.pageYOffset || d.documentElement.scrollTop;
        const targetPosition = target.getBoundingClientRect().top - gap;
        const startTime = Date.now();

        (function scroll() {
          const currentTime = Date.now() - startTime;
          if (currentTime < duration) {
            scrollTo(0, easing[easingType](currentTime, scrollTop, targetPosition, duration));
            requestAnimationFrame(scroll);
          } else {
            scrollTo(0, targetPosition + scrollTop);
          }
        })();
      });
    });
  };
  

  /**
   * キャラクター音声の操作
   * @param  {Object} audioElement mp3のファイル指定
   * @param  {Object} buttonElement mp3を操作するボタン要素
   * @param  {Object} imageElement.toggleClassTarget 切り替えimgのセレクタ指定
   * @param  {Object} imageElement.toggleClassTargetAll 全体の切り替えimgの共通クラスセレクタ指定
   * @param  {Array} imageElement.character 音声に関連するキャラクター画像名を配列に格納
   */
  class ControlVoice {
    constructor(
      config = {
        audioElement: null,
        audioButton: null,
        imageElement: {
          toggleClassTarget: null,
          toggleClassTargetAll: null,
          character: []
        }
      }
    ) {
      this.audioElement = new Audio(config.audioElement);
      this.audioButton = config.audioButton;
      this.imageElement = config.imageElement.toggleClassTarget;
      this.imageElementAll = config.imageElement.toggleClassTargetAll;
      this.character = config.imageElement.character;
      this.init();
    }

    init() {
      this.audioElement.muted = true;
      document.querySelectorAll(this.audioButton)[0].parentNode.insertBefore(this.audioElement, document.querySelectorAll(this.audioButton)[0].nextSibling);
      this.handleButton();
    }

    /**
     * オーディオボタンのクリックイベント
     * 以降の関連メソッドはこのイベントに集約
     */
    handleButton() {
      [].slice.call(document.querySelectorAll(this.audioButton)).forEach(audioButton => {
        audioButton.addEventListener('click', (e) => {
          e.preventDefault();
          if (this.audioElement.paused) {
            this.handleStopAll();
            this.handlePlay();
          } else {
            this.handleStop();
          }
        });
      })
    }

    /**
     * 再生処理
     */
    handlePlay() {
      this.audioElement.muted = false;
      this.audioElement.play();
      this.handleToggleClass(this.imageElement, 'add');
      this.handleSetImage();
      this.handleEnd();
    }

    /**
     * 停止処理
     */
    handleStop() {
      this.audioElement.pause();
      this.audioElement.currentTime = 0;
      this.handleToggleClass(this.imageElement, 'remove');
      this.handleClearImage();
    }
    
    /**
     * すべてのaudioタグの再生停止(初期化目的)
     */
    handleStopAll() {
      this.handleToggleClass(this.imageElementAll, 'remove');
      [].slice.call(document.querySelectorAll('audio')).forEach(audio => {
        audio.pause();
        audio.currentTime = 0;
      });
      this.handleClearImage();
    }

    /**
     * 再生終了後の処理
     * 再生前の状態に変更する
     */
    handleEnd() {
      this.audioElement.addEventListener("ended", ()=>{
        this.handleToggleClass(this.imageElement, 'remove');
        this.handleClearImage();
      });
    }

    
    /**
     * img要素のクラス付け替え管理
     * @param  {Object} target  classListで操作する対象セレクタ ex)this.imageElementAll
     * @param  {String} classListType classListの種別 ex)'add'
     */
    handleToggleClass(target, classListType) {
      [].slice.call(document.querySelectorAll(target)).forEach(img => {
        img.classList[classListType]('is-toggleAnimation');
      });
    }

    
    /**
     * 画像ループ開始
     * this.characterでセットした画像を順々に表示
     */
    handleSetImage() {
      let count = 0;
      this.timerId = setInterval(() => {
        document.querySelector(this.imageElement).setAttribute('src', `asset/images/${this.character[count]}`);
        count++;
        if (count >= this.character.length) count = 0;

        //再生されてからループ中に音声が停止されていたら解除
        if (this.audioElement.paused) {
          clearInterval(this.timerId);
          document.querySelector(this.imageElement).setAttribute('src', `asset/images/${this.character[0]}`);
        }
      }, 300);
    }
    
    
    /**
     * 画像ループ停止
     * handleSetImage()をクリアして、画像を1枚目に戻す
     */
    handleClearImage() {
      clearInterval(this.timerId);
      document.querySelector(this.imageElement).setAttribute('src', `asset/images/${this.character[0]}`);
    }
  }


  // 実行
  w.addEventListener('DOMContentLoaded', () => {
    
    if (document.uniqueID && document.documentMode == 11) console.log("is IE11");

    smoothScroll(600, d.querySelector('.js-localNav').clientHeight);

  });


  w.addEventListener('load', () => {
    //AudioControl インスタンス化
    const toggleClassTargetAll = '.js-toggleImage';
    new ControlVoice({
      audioElement: '/asset/audio/kokoronosora.mp3',
      audioButton: '.js-handleButton.js-one',
      imageElement: {
        toggleClassTarget: '.js-audioImage.js-one',
        toggleClassTargetAll: toggleClassTargetAll,
        character: [
          'boy_01.png',
          'boy_02.png',
          'boy_03.png'
        ]
      }
    });


    new ControlVoice({
      audioElement: '/asset/audio/present.mp3',
      audioButton: '.js-handleButton.js-two',
      imageElement: {
        toggleClassTarget: '.js-audioImage.js-two',
        toggleClassTargetAll: toggleClassTargetAll,
        character: [
          'boy_03.png',
          'boy_02.png',
          'boy_01.png'
        ]
      }
    });

    new accordion('.js_accordion > .js_accordionButton', '.js_accordion > .js_accordionTarget', {
      transitionDuration: '1s',
    });
    new accordion('.js_accordion3', '.js_accordionTarget3', {
      transitionTimingFunction: 'cubic-bezier(0.175, 0.885, 0.320, 1.275)'
    });

    new modal('.js_popUp');
    new modal('.js_popUpVideo', {
      type: 'video'
    });
    new modal('.js_popUpIframe', {
      type: 'iframe'
    });

    // new countDown('#count', '2020/6/12 10:00:00', '2021/4/22 10:00:00');
    // new countDown('#count2', '2020/6/12 10:00:00', '2021/4/26 10:00:00');
  });



  const setKeyvisual = () => {
    //SVG要素
    const glitchItem = [].slice.call(d.querySelectorAll(".js-glitchItem"));
    const glitchImage = [].slice.call(d.querySelectorAll(".js-glitchItem image"));

    //add-activeを持つimageタグのindex
    let index = glitchImage.findIndex(list =>
      [].slice.call(list.classList).includes("add-active")
    );
    //add-active付け替え用のindex
    let updateIndex = index;

    //インターバル
    const changeInterval = 3000;

    //add-activeの付け替え
    setInterval(() => {
      glitchItem.forEach(item => {
        item.querySelectorAll('image')[updateIndex].classList.remove('add-active');
      });
      updateIndex >= glitchItem.length - 1 ? updateIndex = 0 : updateIndex += 1;
      glitchItem.forEach(item => {
        item.querySelectorAll('image')[updateIndex].classList.add('add-active');
      });
    }, changeInterval);


    //KV
    const keyvisual = d.getElementById('js-keyvisual');
    const ketvisualArray = [
      'https://marksman.itembox.design/item/assets/img/top/slide01.jpg',
      'https://marksman.itembox.design/item/assets/img/top/slide02.jpg',
      'https://marksman.itembox.design/item/assets/img/top/slide03.jpg',
      'https://marksman.itembox.design/item/assets/img/top/slide04.jpg'
    ]
    setInterval(() => {
      keyvisual.setAttribute('src', ketvisualArray[index]);
      index >= glitchItem.length ? index = 0 : index += 1;
    }, changeInterval);
  }
  setKeyvisual();
  


  //fullpage
  const setGlitchAnimation = (classListType) => {
    document.querySelectorAll('.js-glitchSVG')[0].classList[classListType]('is-glitch');
    document.querySelectorAll('.js-glitchSVG')[1].classList[classListType]('is-glitch2');
    const currentSection = [].slice.call(document.querySelectorAll('.js-section.active .js-toggleActive'));
    currentSection.forEach(currentItem => {
      currentItem.classList[classListType]('is-active');
    });
  }
  
  $(document).ready(function () { 
    
    $('#fullpage').fullpage({
      sectionSelector: '.js-section',
      navigation: true,
      paddingTop: '64px',
      scrollOverflow: true,
      normalScrollElements: '.js-normalScroll',
      onLeave: function (index, nextIndex, direction) {
        setGlitchAnimation('remove');
      },
      afterLoad: function (anchorLink, afterIndex) {
        setGlitchAnimation('add');
      },
      afterResize: function () {
        // $.fn.fullpage.reBuild();
      }
    });

  });

})(document, window);