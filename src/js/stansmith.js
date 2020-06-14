
require('intersection-observer'); //https://github.com/w3c/IntersectionObserver/tree/master/polyfill
import objectFitImages from 'object-fit-images';
objectFitImages(); //https://github.com/fregante/object-fit-images

((d, w, util) => {

  // コンテンツ画像設定
  const images = {
    list: [
      {
        'kv': 'lp-hero_kvBlack_1906.jpg',
        'statement': 'lp-hero_kvStatementBlack_1906.jpg',
        "look": [
          'lp-feature_BlackLook01_1906.jpg',
          'lp-feature_BlackLook02_1906.jpg',
          'lp-feature_BlackLook03_1906.jpg',
          'lp-feature_BlackLook04_1906.jpg',
          'lp-feature_BlackLook05_1906.jpg',
          'lp-feature_BlackLook06_1906.jpg'
        ],
        "alt": "Ryo Takaiwa",
        "class": 'add_black',
        'color': '#000'
      },
      {
        'kv': 'lp-hero_kvYellow_1906.jpg',
        'statement': 'lp-hero_kvStatementYellow_1906.jpg',
        "look": [
          'lp-feature_YellowLook01_1906.jpg',
          'lp-feature_YellowLook02_1906.jpg',
          'lp-feature_YellowLook03_1906.jpg',
          'lp-feature_YellowLook04_1906.jpg',
          'lp-feature_YellowLook05_1906.jpg',
          'lp-feature_YellowLook06_1906.jpg'
        ],
        "alt": "Sara Mary",
        "class": 'add_yellow',
        'color': '#fff000'
      },
      {
        'kv': 'lp-hero_kvOrange_1906.jpg',
        'statement': 'lp-hero_kvStatementOrange_1906.jpg',
        "look": [
          'lp-feature_OrangeLook01_1906.jpg',
          'lp-feature_OrangeLook02_1906.jpg',
          'lp-feature_OrangeLook03_1906.jpg',
          'lp-feature_OrangeLook04_1906.jpg',
          'lp-feature_OrangeLook05_1906.jpg',
          'lp-feature_OrangeLook06_1906.jpg'
        ],
        "alt": "KOM I",
        "class": 'add_orange',
        'color': '#f04600'
      },
      {
        'kv': 'lp-hero_kvRed_1906.jpg',
        'statement': 'lp-hero_kvStatementRed_1906.jpg',
        "look": [
          'lp-feature_RedLook01_1906.jpg',
          'lp-feature_RedLook02_1906.jpg',
          'lp-feature_RedLook03_1906.jpg',
          'lp-feature_RedLook04_1906.jpg',
          'lp-feature_RedLook05_1906.jpg',
          'lp-feature_RedLook06_1906.jpg'
        ],
        "alt": "Yusuke Oshiba",
        "class": 'add_red',
        'color': '#e60000'
      }
    ],
    setMask: (shuffleList) => {
      const mask = util.maskContainer;
      const num = 1 / 30;
      let divArray = [];
      let randomHeight = num;
      let positionTop = 0;
      let total = 0;

      while (positionTop <= 1) {
        const div = d.createElement('div');
        mask.appendChild(div);
        divArray.push(div);
        total % 2 == 0 ? randomHeight += Math.random() * num : randomHeight -= Math.random() * num;
        div.style.top = 100 * positionTop - .1 + "%",
        div.style.height = 100 * randomHeight + .1 + "%",
        positionTop += randomHeight;
        total++;
      }

      
      //初回のマスクカラーとアニメーション
      util.sliceCall(divArray, (div) => {
        div.setAttribute('class', 'mask_parts');
        div.style.backgroundColor = shuffleList[1].color;
        let duration = util.isMobile ? 1 : 1.4;
        let delay = .012 * Math.floor(Math.random() * 30);
        div.style.animation = `maskActive ${duration}s ${delay}s both linear`;
        div.classList.add('is_active');
        setTimeout(() => {
          div.style.animation = 'none';
          div.classList.remove('is_active');
        }, 2000);
      });

      //一定時間でマスクカラーとアニメーション
      let intetrval = 2;
      setInterval(() => {
        util.sliceCall(divArray, (div) => {
          div.style.backgroundColor = shuffleList[intetrval].color;
          let duration = util.isMobile ? 1.2 : 1.4;
          let delay = .012 * Math.floor(Math.random() * 30);
          div.style.animation = `maskActive ${duration}s ${delay}s both linear`;
          div.classList.add('is_active');
          setTimeout(() => {
            div.style.animation = 'none';
            div.classList.remove('is_active');
            delay = .012 * Math.floor(Math.random() * 30);
          }, 2000);
        });
        if (intetrval >= (images.list.length - 1)) {
          intetrval = 0;
        } else {
          intetrval++;
        }
      }, 4000);
    },
    setHero: (shuffleList) => {
      //KVとstatement画像と関連クラス追加
      util.keyVisual.sp.setAttribute('src', 'images/mobile/' + shuffleList[0].kv);
      util.keyVisual.pc.setAttribute('srcset', 'images/' + shuffleList[0].kv);
      util.statement.sp.setAttribute('src', 'images/mobile/' + shuffleList[0].statement);
      util.statement.pc.setAttribute('srcset', 'images/' + shuffleList[0].statement);
      if (shuffleList[0].class === 'add_black') {
        util.sliceCall(d.querySelectorAll('.js_logo'), (logo) => {
          logo.classList.add('add_black');
        });
      }

      //一定時間で画像差替え
      let intetrval = 1;
      setInterval(() => {
        util.keyVisual.sp.setAttribute('src', 'images/mobile/' + shuffleList[intetrval].kv);
        util.keyVisual.pc.setAttribute('srcset', 'images/' + shuffleList[intetrval].kv);
        util.statement.sp.setAttribute('src', 'images/mobile/' + shuffleList[intetrval].statement);
        util.statement.pc.setAttribute('srcset', 'images/' + shuffleList[intetrval].statement);
        if (shuffleList[intetrval].class === 'add_black') {
          util.sliceCall(d.querySelectorAll('.js_logo'), (logo) => {
            logo.classList.add('add_black');
          });
        } else {
          util.sliceCall(d.querySelectorAll('.js_logo'), (logo) => {
            logo.classList.remove('add_black');
          });
        }
        if (intetrval >= (images.list.length - 1)) {
          intetrval = 0;
        } else {
          intetrval++;
        }
      }, 4000);
    },
    setFeature: (shuffleList) => {
      //featureエリア画像
      util.sliceCall(util.look, (look, index) => {
        look.classList.add(shuffleList[index].class);
        if(d.querySelector('.js_lookList.add_black .ctaButton')) d.querySelector('.js_lookList.add_black .ctaButton').classList.add('is_white');

        const lookImageSP = look.querySelectorAll('.js_lookSP');
        const lookImagePC = look.querySelectorAll('.js_lookPC');
        for (let i = 0; i < lookImageSP.length; i++) {
          lookImageSP[i].setAttribute('src', 'images/mobile/' + shuffleList[index].look[i]);
          lookImagePC[i].setAttribute('srcset', 'images/' + shuffleList[index].look[i]);
          lookImageSP[i].setAttribute('alt', `モデル ${shuffleList[index].alt} ${i + 1}枚目`);
        }
      });

      //featureエリアの背景画像
      util.sliceCall(util.backgroundImage, (bg, index) => {
        bg.classList.add(shuffleList[index].class);
      });
    },
    init: () => {
      //images.listの配列シャッフル
      const shuffleList = util.shuffle(images.list);
      //画像セット
      images.setHero(shuffleList);
      images.setFeature(shuffleList);
      //マスクセット
      setTimeout(() => {
        images.setMask(shuffleList);
      }, 3300);
    }
  }


  // パララックス
  const parallax = {
    switchBackgronud: () => {
      w.addEventListener('scroll', () => {
        util.sliceCall(util.parallax, (parallaxItem, index) => {
          const parallaxRect = parallaxItem.getBoundingClientRect();
          util.backgroundImage[index].classList[(parallaxRect.bottom / 2.3 > innerHeight) ? 'add' : 'remove']('add_image');
          util.backgroundBox[index].classList[(parallaxRect.bottom + innerHeight < innerHeight) ? 'add' : 'remove']('add_hide');
        });
      });
    },
    movedBackground: () => {
      w.addEventListener('scroll', () => {
        util.sliceCall(util.parallax, (parallaxItem, index) => {
          const parallaxRect = parallaxItem.getBoundingClientRect();
          if (parallaxRect.top + innerHeight < innerHeight && parallaxRect.bottom / 2.3 > innerHeight) util.backgroundBox[index].style.top = `${parallaxRect.top * .0085}%`;
        });
      });
    }
  }


  // フッターイベント
  const footer = {
    sticky: d.getElementById('footerSticky'),
    windowHeight: innerHeight,
    resize: () => {
      w.addEventListener('resize', () => {
        footer.windowHeight = innerHeight;
      });
    },
    scroll: () => {
      if (util.isMobile) {
        w.addEventListener('scroll', () => {
            (d.getElementById('hero').clientHeight < pageYOffset && d.getElementById('footer').getBoundingClientRect().top > footer.windowHeight) ? footer.sticky.classList.add('is_active') : footer.sticky.classList.remove('is_active');
        });
      }
    }
  }


  // 実行
  w.addEventListener('load', () => {
    images.init();

    footer.resize();
    footer.scroll();

    parallax.switchBackgronud();
    parallax.movedBackground();

    util.loader.style.opacity = '0';
    setTimeout(() => {
      util.loader.parentNode.removeChild(util.loader);
    },1000);
    d.body.classList.remove('is_lock');
  });

})(document, window, {
  isMobile: innerWidth < 960 ? true : false, 
  globalHeader: document.getElementById('header'), 
  globalFooter: document.getElementById('footer'),
  mainContainer: document.getElementById('stansmith'),
  loader: document.getElementById('loader'),
  maskContainer: document.getElementById('maskContainer'),
  keyVisual: {
    sp: document.getElementById('js_keyVisualSP'),
    pc: document.getElementById('js_keyVisualPC')
  },
  statement: {
    sp: document.getElementById('js_statementSP'),
    pc: document.getElementById('js_statementPC')
  },
  backgroundBox: document.querySelectorAll('.js_background_box'),
  backgroundImage: document.querySelectorAll('.js_background'),
  look: document.querySelectorAll('.js_lookList'),
  parallax: document.querySelectorAll('.js_parallax'),

  /**
   * @param  {String} element 配列風にするセレクター
   * @param  {Object} callback forEachによるコールバック
   */
  sliceCall: (element, callback) => {
    return callback ? [].slice.call(element).forEach(callback) : [].slice.call(element);
  },

  /**
   * 配列順をランダムに変更
   * @param {Array} array 対象の配列
   * @returns {Array} 出力配列
   */
  shuffle: function(array) {
    for(let i = array.length - 1; i > 0; i--){
      const r = Math.floor(Math.random() * (i + 1));
      const tmp = array[i];
      array[i] = array[r];
      array[r] = tmp;
    }
    return array
  }
});
