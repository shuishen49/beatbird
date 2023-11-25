System.register("chunks:///_virtual/AudioManager.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, AudioClip, AudioSource, Component;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      AudioClip = module.AudioClip;
      AudioSource = module.AudioSource;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor, _descriptor2;

      cclegacy._RF.push({}, "4de63tu9lFGf7rvwU6Xc1ek", "AudioManager", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var AudioManager = exports('AudioManager', (_dec = ccclass('AudioManager'), _dec2 = property([AudioClip]), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(AudioManager, _Component);

        function AudioManager() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "audioList", _descriptor, _assertThisInitialized(_this));

          _this._dict = {};
          _this._audioSource = null;

          _initializerDefineProperty(_this, "defaultVolume", _descriptor2, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = AudioManager.prototype; // 默认音量

        _proto.onLoad = function onLoad() {
          for (var i = 0; i < this.audioList.length; i++) {
            var element = this.audioList[i];
            this._dict[element.name] = element;
          }

          this._audioSource = this.getComponent(AudioSource);
        };

        _proto.play = function play(name, volume) {
          if (volume === void 0) {
            volume = this.defaultVolume;
          }

          var audioClip = this._dict[name];

          if (audioClip !== undefined) {
            this._audioSource.playOneShot(audioClip, volume);
          }
        };

        return AudioManager;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "audioList", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "defaultVolume", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 1;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/birdControl.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './BirdManager.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Vec3, Node, Animation, v2, tween, Tween, Component, BirdManager;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Vec3 = module.Vec3;
      Node = module.Node;
      Animation = module.Animation;
      v2 = module.v2;
      tween = module.tween;
      Tween = module.Tween;
      Component = module.Component;
    }, function (module) {
      BirdManager = module.BirdManager;
    }],
    execute: function () {
      var _dec, _class, _class2, _descriptor;

      cclegacy._RF.push({}, "e5de3PJIwVDsrxQvJxGpOIk", "birdControl", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var birdContorl = exports('birdContorl', (_dec = ccclass('birdContorl'), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(birdContorl, _Component);

        function birdContorl() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "hp", _descriptor, _assertThisInitialized(_this));

          _this.targetpos = null;
          _this.speed = 25;
          _this.time = 0;
          _this.maxy = 1260;
          _this.die_time = 0.5;
          _this.dieCallBack = void 0;
          _this.addScoreCallback = void 0;
          _this.birdManager = null;
          _this.groundAudioNames = ["on_ground1", "on_ground2", "on_ground3"];
          return _this;
        }

        var _proto = birdContorl.prototype;

        _proto.start = function start() {
          this.birdManager = this.node.parent.getComponent(BirdManager); // 获取 BirdManager 组件的引用

          this.node.setPosition(this.getRandomStartPosition());
          this.fly();
        };

        _proto.getRandomStartPosition = function getRandomStartPosition() {
          var randomX = Math.random() * 890 - 430; // 生成 -430 到 460 之间的随机数

          var randomY = 0;
          return new Vec3(randomX, randomY, 0);
        };

        _proto.onLoad = function onLoad() {
          this.node.on(Node.EventType.TOUCH_START, this._touch, this);
        };

        _proto.fly = function fly() {
          var _this2 = this;

          var duration = 1; // Random duration between 2 and 5 seconds

          this.speed = 1; // this.targetpos = v2(Math.random() * 800 + 75, this.maxy);

          if (this.hp == 1) {
            // 在需要随机执行的地方
            var randomValue = Math.random(); // 生成 0 到 1 之间的随机数

            if (randomValue < 0.5 || this.node.position.y < 200) {
              // 50% 的几率播放声音
              this.birdManager.playAudioEffect("duck-flapping", 0.3);
              this.node.getComponent(Animation).play("fly");
              this.targetpos = v2(-425 + Math.random() * 876, 300 + this.node.position.y); // 判断目标位置相对于当前位置的方向

              var direction = this.targetpos.x > this.node.position.x ? 1 : -1; // 根据方向来翻转图像

              this.node.scale = new Vec3(Math.abs(this.node.scale.x) * direction, this.node.scale.y, 1);
            } else {
              this.node.getComponent(Animation).play("fly2");
              var randomX = this.node.position.x > 0 ? -425 : 451;
              var randomY = this.node.position.y + Math.random() * 200;
              this.targetpos = v2(randomX, randomY); // 判断目标位置相对于当前位置的方向

              var _direction = this.targetpos.x > this.node.position.x ? 1 : -1; // 根据方向来翻转图像


              this.node.scale = new Vec3(Math.abs(this.node.scale.x) * _direction, this.node.scale.y, 1);
            }

            tween(this.node).stop().to(this.speed, {
              position: new Vec3(this.targetpos.x, this.targetpos.y)
            }).call(function () {
              // console.log("this.node.position.y：", this.node.position.y);
              if (_this2.node.position.y >= _this2.maxy) {
                console.log("跳出了屏幕");

                _this2.dieCallBack();
              }
            }).start();
          }

          this.scheduleOnce(this.fly.bind(this), duration); // Schedule next fly after duration + 2 seconds
        };

        _proto._touch = function _touch() {
          var _this3 = this;

          this.hp -= 1; // 将 this.hp 减 1
          // this.birdManager.playAudioEffect("shoot1"); // 调用 BirdManager 的方法
          // 延迟 1 秒后执行

          if (this.hp === 0) {
            this.node.getComponent(Animation).stop();
            this.node.getComponent(Animation).play("hit");
            Tween.stopAllByTarget(this.node);
            tween(this.node).stop().delay(this.die_time).call(function () {
              _this3.node.getComponent(Animation).play("die");

              _this3.birdManager.playAudioEffect("fall"); // 调用 BirdManager 的方法

            }).start();
            tween(this.node).stop().delay(this.die_time).to(1, {
              position: new Vec3(this.node.position.x, 0, 0)
            }).call(function () {
              var randomIndex = Math.floor(Math.random() * _this3.groundAudioNames.length);
              var randomAudioName = _this3.groundAudioNames[randomIndex];

              _this3.birdManager.playAudioEffect(randomAudioName);

              _this3.node.destroy();
            }).start();
            this.addScoreCallback();
          }

          this.addScoreCallback();
        };

        return birdContorl;
      }(Component), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "hp", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 1;
        }
      }), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/BirdManager.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './birdControl.ts', './AudioManager.ts', './dogControl.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Prefab, Label, Node, instantiate, director, Component, birdContorl, AudioManager, dogControl;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Prefab = module.Prefab;
      Label = module.Label;
      Node = module.Node;
      instantiate = module.instantiate;
      director = module.director;
      Component = module.Component;
    }, function (module) {
      birdContorl = module.birdContorl;
    }, function (module) {
      AudioManager = module.AudioManager;
    }, function (module) {
      dogControl = module.dogControl;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5;

      cclegacy._RF.push({}, "c9990DJhhFNBqiKw2ujtlbL", "BirdManager", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var BirdManager = exports('BirdManager', (_dec = ccclass('BirdManager'), _dec2 = property(Prefab), _dec3 = property(Prefab), _dec4 = property(Label), _dec5 = property(Node), _dec6 = property(AudioManager), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(BirdManager, _Component);

        function BirdManager() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "birdPre", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "dogPre", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "scoreLabel", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "back_View", _descriptor4, _assertThisInitialized(_this));

          _this.time = 1;
          _this.score = 0;
          _this.callback = void 0;
          _this.Count = 0;

          _initializerDefineProperty(_this, "audioEffect", _descriptor5, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = BirdManager.prototype;

        _proto.start = function start() {
          // 计时器运行的函数
          this.callback = function () {
            var _this2 = this; // 这里的 this 指向 component


            var bird = instantiate(this.birdPre); // 生产狗

            var dog = instantiate(this.dogPre);
            bird.setParent(this.node);
            dog.setParent(this.node);
            bird.y = this.node.y;
            bird.x = Math.random() * 890 - 430; // 生成 -430 到 460 之间的随机数

            dog.y = 0;
            dog.x = Math.random() * 890 - 430; // 生成 -430 到 460 之间的随机数

            bird.getComponent(birdContorl).start(); // 鸭子出现

            this.audioEffect.play("duck-quack");

            bird.getComponent(birdContorl).addScoreCallback = function () {
              _this2.score += 100;
              _this2.Count += 1; // console.debug("分数:" + this.score);

              _this2.scoreLabel.string = _this2.score + "";
            };

            dog.getComponent(dogControl).addScoreCallback = function () {
              _this2.score += 1000;
              _this2.scoreLabel.string = _this2.score + "";
            };

            bird.getComponent(birdContorl).dieCallBack = function () {
              _this2.node.destroyAllChildren();

              console.debug("鸟跑了游戏结束"); // 取消计时器

              _this2.back_View.active = true;

              _this2.unschedule(_this2.callback);
            };
          }; // 每秒执行一次


          this.schedule(this.callback, this.time);
        };

        _proto.playAudioEffect = function playAudioEffect(name, volume) {
          if (volume === void 0) {
            volume = 1;
          }

          this.audioEffect.play(name, volume);
        };

        _proto.backView = function backView() {
          this.back_View.active = false;
          director.loadScene("start");
        } // update(deltaTime: number) {
        // }
        ;

        return BirdManager;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "birdPre", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "dogPre", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "scoreLabel", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "back_View", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "audioEffect", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/dogControl.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './BirdManager.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, RigidBody2D, Node, Animation, Vec3, tween, Component, BirdManager;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      RigidBody2D = module.RigidBody2D;
      Node = module.Node;
      Animation = module.Animation;
      Vec3 = module.Vec3;
      tween = module.tween;
      Component = module.Component;
    }, function (module) {
      BirdManager = module.BirdManager;
    }],
    execute: function () {
      var _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3;

      cclegacy._RF.push({}, "e915a1hHtFMHbPW70djMimc", "dogControl", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var dogControl = exports('dogControl', (_dec = ccclass('dogControl'), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(dogControl, _Component);

        function dogControl() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "jumpForce", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "horizontalForce", _descriptor2, _assertThisInitialized(_this));

          _this.addScoreCallback = void 0;
          _this.rigidBody = void 0;
          _this.prevYVelocity = 0;
          _this.dog_status = "jump";

          _initializerDefineProperty(_this, "hp", _descriptor3, _assertThisInitialized(_this));

          _this.birdManager = null;
          return _this;
        }

        var _proto = dogControl.prototype; // 声明一个 BirdManager 引用

        _proto.onLoad = function onLoad() {
          this.rigidBody = this.getComponent(RigidBody2D);
          this.node.on(Node.EventType.TOUCH_START, this._touch, this);
        };

        _proto.start = function start() {
          this.birdManager = this.node.parent.getComponent(BirdManager); // 获取 BirdManager 组件的引用

          this.node.setPosition(this.getRandomStartPosition()); // 当你想要让精灵跳跃时，调用 jump 方法

          this.node.getComponent(Animation).play("dog_jump");
          this.jump(); // 当你想要在水平方向施加力时，调用 applyHorizontalForce 方法

          this.birdManager.playAudioEffect("dog_jiao"); // 调用 BirdManager 的方法
        };

        _proto.getRandomStartPosition = function getRandomStartPosition() {
          var randomX = Math.random() * 890 - 430; // 生成 -430 到 460 之间的随机数

          var randomY = 0;
          return new Vec3(randomX, randomY, 0);
        };

        _proto.jump = function jump() {
          // 施加向上的力以使精灵跳跃
          var velocity = this.rigidBody.linearVelocity;
          velocity.y = this.jumpForce; // 生成一个从 -13 到 13 的随机数

          var randomVelocityX = Math.random() * (this.horizontalForce - -this.horizontalForce) + -this.horizontalForce; // 设置精灵的水平速度

          velocity.x = randomVelocityX;
          this.rigidBody.linearVelocity = velocity;
        };

        _proto.update = function update(dt) {
          var _this2 = this; // 获取精灵的Y轴速度


          var velocity = this.rigidBody.linearVelocity;
          var yVelocity = velocity.y; // 根据精灵的Y轴速度切换动画

          if (this.hp > 0 && this.dog_status === "jump" && this.node.position.y > 0) {
            if (yVelocity !== this.prevYVelocity) {
              this.prevYVelocity = yVelocity;

              if (yVelocity < 10 && yVelocity > -10) {
                // 正在下降，播放下落动画
                this.node.getComponent(Animation).play("dog_Idle");
              } else if (yVelocity < -10) {
                // 垂直速度为0，可能是平稳状态，播放平稳动画
                this.node.getComponent(Animation).play("dog_Fall");
              }
            }
          } // 检查精灵的Y轴坐标是否小于0，如果小于0，执行资源回收操作


          if (this.node.position.y < 0 && this.dog_status == "jump") {
            this.dog_status = "run_away";
            console.log("this.dog_status:" + this.dog_status); // 落地音效

            this.birdManager.playAudioEffect("on_ground3"); // 调用 BirdManager 的方法

            this.rigidBody.enabled = false; // 销毁资源

            if (this.hp > 0 && this.dog_status === "run_away") {
              this.node.getComponent(Animation).play("dog_laugh");
              tween(this.node).stop().call(function () {
                _this2.birdManager.playAudioEffect("dog-laugh"); // 调用 BirdManager 的方法

              }).to(0.5, {
                position: new Vec3(this.node.position.x, 100)
              }).to(1, {
                position: new Vec3(this.node.position.x, 100)
              }).to(0.5, {
                position: new Vec3(this.node.position.x, -100)
              }).call(function () {
                _this2.node.destroy();
              }).start();
            }
          } // 销毁dog


          if (this.node.position.y < -100) {
            this.node.destroy();
          }
        };

        _proto._touch = function _touch() {
          this.hp -= 1; // 将 this.hp 减 1

          this.birdManager.playAudioEffect("boom"); // 调用 BirdManager 的方法
          // 延迟 1 秒后执行

          if (this.hp === 0) {
            // 获取精灵的刚体组件
            var rigidBody = this.node.getComponent(RigidBody2D); // 将水平速度设置为0

            var velocity = rigidBody.linearVelocity;
            velocity.x = 0;
            velocity.y = 20;
            rigidBody.linearVelocity = velocity;
            this.node.getComponent(Animation).play("dog_die");
            this.addScoreCallback();
          }
        };

        return dogControl;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "jumpForce", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 13;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "horizontalForce", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 13;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "hp", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 1;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/GameController.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './AudioManager.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Prefab, Node, Vec3, UITransform, instantiate, Component, AudioManager;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Prefab = module.Prefab;
      Node = module.Node;
      Vec3 = module.Vec3;
      UITransform = module.UITransform;
      instantiate = module.instantiate;
      Component = module.Component;
    }, function (module) {
      AudioManager = module.AudioManager;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2;

      cclegacy._RF.push({}, "7751ebJvh5F65IQlgx/ozIx", "GameController", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var GameController = exports('GameController', (_dec = ccclass('GameController'), _dec2 = property({
        type: Prefab
      }), _dec3 = property(AudioManager), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(GameController, _Component);

        function GameController() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "bulletPrefab", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "audioEffect", _descriptor2, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = GameController.prototype;

        _proto.onLoad = function onLoad() {
          this.node.on(Node.EventType.TOUCH_START, this.onScreenTouched, this);
        };

        _proto.playAudioEffect = function playAudioEffect(name, volume) {
          if (volume === void 0) {
            volume = 1;
          }

          this.audioEffect.play(name, volume);
        };

        _proto.onScreenTouched = function onScreenTouched(touchEvent) {
          var touchPos = touchEvent.getUILocation(); // 获取 UI 触摸位置

          var worldPos = new Vec3(touchPos.x, touchPos.y, 0); // 转换为当前节点的局部坐标

          var localPos = this.node.getComponent(UITransform).convertToNodeSpaceAR(worldPos); // 实例化 bullet

          var bullet = instantiate(this.bulletPrefab);
          bullet.setPosition(localPos);
          this.node.addChild(bullet);
          this.playAudioEffect("shoot1"); // 调用 BirdManager 的方法
          // 设置1秒后销毁 bullet

          this.scheduleOnce(function () {
            bullet.destroy();
          }, 1);
        };

        return GameController;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "bulletPrefab", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "audioEffect", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/main", ['./AudioManager.ts', './BirdManager.ts', './GameController.ts', './birdControl.ts', './dogControl.ts', './startControl.ts'], function () {
  'use strict';

  return {
    setters: [null, null, null, null, null, null],
    execute: function () {}
  };
});

System.register("chunks:///_virtual/startControl.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, _decorator, director, Component;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      director = module.director;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _class;

      cclegacy._RF.push({}, "6f826/25JBBkKP1kQvHCrzR", "startControl", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var startControl = exports('startControl', (_dec = ccclass('startControl'), _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(startControl, _Component);

        function startControl() {
          return _Component.apply(this, arguments) || this;
        }

        var _proto = startControl.prototype;

        _proto.start = function start() {} // update(deltaTime: number) {
        // }
        ;

        _proto.startGame = function startGame() {
          director.loadScene("game");
        };

        return startControl;
      }(Component)) || _class));

      cclegacy._RF.pop();
    }
  };
});

(function(r) {
  r('virtual:///prerequisite-imports/main', 'chunks:///_virtual/main'); 
})(function(mid, cid) {
    System.register(mid, [cid], function (_export, _context) {
    return {
        setters: [function(_m) {
            var _exportObj = {};

            for (var _key in _m) {
              if (_key !== "default" && _key !== "__esModule") _exportObj[_key] = _m[_key];
            }
      
            _export(_exportObj);
        }],
        execute: function () { }
    };
    });
});