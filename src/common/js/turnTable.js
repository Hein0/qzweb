
    var Draw = {
        init(ele, prize, selectIndex, imgDom) {
            this.ctx = ele.getContext('2d');
            this.prize = prize;
            this.selectIndex = selectIndex;
            this.imgDom = imgDom;

            this.length = this.prize.length;
            this.radian = Math.PI * 2 / this.length;
            this.angle = 360/this.length;
            this.radius = 157.5;
            this.m_radius = 142.5;
            this.s_radius = 137;
            this.rate = 1; // 滑动距离

            this.ctx.translate(157.5, 157.5)

            this.drawTurntable(1)

        },
        // 转盘
        drawTurntable(type) {
            let ctx = this.ctx,
                length = this.length,
                radian = this.radian,
                angle = this.angle,
                radius = this.radius,
                m_radius = this.m_radius,
                s_radius = this.s_radius,
                selectIndex = this.selectIndex,
                prize = this.prize,

                max_angle = type? Math.PI*2 : Math.PI * 2 * ((length - 1) / length);

            let angleToRadian = this.angleToRadian;

            ctx.clearRect(-157.5,-157.5, 315, 315)
            ctx.save()
            ctx.beginPath();
            if (selectIndex != length) {
                ctx.rotate(selectIndex * radian)
            }
            ctx.arc(0, 0, radius, 0, max_angle)
            ctx.lineTo(0,0)
            ctx.fillStyle = '#ff4e4e';
            ctx.fill()
            ctx.closePath()
            ctx.restore()

            ctx.save()
            ctx.beginPath();
            if (selectIndex != length) {
                ctx.rotate(selectIndex * radian)
            }
            ctx.arc(0, 0, m_radius + 1, 0,max_angle)
            ctx.lineTo(0,0)
            ctx.fillStyle = '#e34040';
            ctx.fill();
            ctx.closePath();
            ctx.restore()

            ctx.save()
            ctx.beginPath();
            if (selectIndex != length) {
                ctx.rotate(selectIndex * radian)
            }
            ctx.arc(0, 0,s_radius , 0, max_angle)
            ctx.lineTo(0,0)
            ctx.fillStyle = '#ffffff';
            ctx.fill();
            ctx.closePath();
            ctx.restore()

            ctx.save();
            for (var i = 0; i < length; i++) {
                ctx.beginPath();
                ctx.rotate(radian);
                ctx.moveTo(0, 0);
                ctx.lineTo(s_radius , 0);
                ctx.strokeStyle = '#ffe1e1';
                ctx.stroke();
                ctx.closePath();
            }
            ctx.restore();

            // 中奖图片
            for (var i=0;i <prize.length;i++) {
                if (type  || i != (selectIndex - 1)) {
                    this.loadImg(ctx, i)
                } else {
                    //console.log(prize[i].name)
                }
            }

            // 圆环
            ctx.save()
            ctx.beginPath()
            if (!type && selectIndex != length) {
                ctx.rotate(selectIndex * radian)
            }
            ctx.arc(0, 0,radius, 0, max_angle)

            ctx.lineTo(0, 0)
            ctx.lineTo(radius,0)
            ctx.clip()
            ctx.closePath()
            for (var i = 0; i < 40; i++) {
                ctx.beginPath()
                ctx.rotate(angleToRadian(9));
                ctx.moveTo(150, 0);
                ctx.arc(150, 0, 4 ,0, Math.PI*2);
                if (i % 2) {
                    ctx.fillStyle = '#fef506';
                }else {
                    ctx.fillStyle = '#ffffff';
                }
                ctx.fill()
                ctx.closePath()
            }
            ctx.restore()

        },

        loadImg (ctx, i, callback) {
            let img = document.querySelector('.' + this.prize[i].class),
                w = img.naturalWidth,
                h = img.naturalHeight;
            ctx.save()
            callback && callback(ctx)
            ctx.rotate(this.angleToRadian((i)*this.angle + this.angle/2 -90));
//          ctx.drawImage(img, -w/4, 60, w/2, h/2);//对半分，但是图片文字有点模糊
            ctx.drawImage(img, -w*0.3, 50, w*0.56, h*0.56);
			
            ctx.restore()
        },

        // 中奖区
        drawWinArea(x, y, opc) {
            let ctx = this.ctx,
                length = this.length,
                radian = this.radian,
                angle = this.angle,
                radius = this.radius,
                m_radius = this.m_radius,
                s_radius = this.s_radius,
                selectIndex = this.selectIndex,
                prize = this.prize,
                max_angle = Math.PI * 2 * ((length - 1) / length);

            // 最外圈的圆
            ctx.save()
            ctx.beginPath()
            x && ctx.translate(x,y)
            ctx.arc(0, 0, radius, (selectIndex - 1) * radian, selectIndex * radian)
            ctx.lineTo(0, 0)
            x?ctx.fillStyle = `rgba(255, 78, 78, ${opc})`:ctx.fillStyle = 'rgb(255, 78, 78)'
            ctx.fill()
            ctx.closePath()
            ctx.restore()

            // 第二个圆
            ctx.save()
            ctx.beginPath()
            x && ctx.translate(x,y)
            ctx.arc(0, 0, m_radius+1, (selectIndex - 1) * radian, selectIndex * radian)
            ctx.lineTo(0, 0)
            x?ctx.fillStyle = `rgba(227, 64, 64, ${opc})`:ctx.fillStyle ='rgb(227, 64, 64)'
            ctx.fill();
            ctx.closePath()
            ctx.restore()

            // 第三个圆
            ctx.save()
            ctx.beginPath()
            x && ctx.translate(x,y)
            ctx.arc(0, 0, s_radius, (selectIndex - 1) * radian, selectIndex * radian)
            ctx.lineTo(0, 0)

            x?ctx.fillStyle = `rgba(255,255,255, ${opc})`:ctx.fillStyle='#ffffff';
            ctx.fill();
            ctx.closePath()
            ctx.restore()


            // 加载图片
            this.loadImg(ctx, selectIndex-1, function () {
                ctx.translate(x,y)
            })

            // 圆环
            ctx.save()
            ctx.beginPath()
            x && ctx.translate(x,y)

            ctx.arc(0, 0,radius,  (selectIndex-1)*radian, selectIndex*radian)
            ctx.rotate(radian*selectIndex)
            ctx.lineTo(0, 0)
            ctx.clip()
            ctx.closePath()

            for (var i = 0; i < 40; i++) {
                ctx.beginPath()
                ctx.rotate(this.angleToRadian(9));
                ctx.moveTo(150, 0);
                ctx.arc(152.5, 0, 4 ,0, Math.PI*2);
                if (i % 2) {
                    ctx.fillStyle = '#fef506';
                }else {
                    ctx.fillStyle = '#ffffff';
                }
                ctx.fill()
                ctx.closePath()
            }

            ctx.restore()

        },

        // 过渡 选区过渡
        transition: function () {
            // 根据实际角度计算坐标正负
            var actualAngle = this.selectIndex * this.angle,
                angle = this.angle,
                index = 0,
                coordinate_x,
                coordinate_y,
                self = this,
                coordinate_param = '',
                move_angle = actualAngle - this.angle/2,
                angleToRadian = self.angleToRadian,
                rate = this.rate;

            if (0 < move_angle  && move_angle <= 90) {
                coordinate_param = coordinate(true, true, angle/2)
            }
            if (90 < move_angle  && move_angle <= 180) {
                coordinate_param = coordinate(false, true, 180-move_angle)
            }
            if (180 < move_angle  && move_angle <= 270) {
                coordinate_param = coordinate(false, false, 180-move_angle)
            }
            if (270 < move_angle  && move_angle <= 360){
                coordinate_param  = coordinate(true, false, angle/2)
            }

            function coordinate (x, y, ang) {
                coordinate_x = rate*index;
                coordinate_y = parseInt(rate * index * Math.tan(angleToRadian(Math.abs(ang))))

                coordinate_x = x?coordinate_x:-coordinate_x;
                coordinate_y = y?coordinate_y:-coordinate_y;

                if (move_angle == 90 ||  move_angle == 270) {
                    coordinate_x = '0';
                    coordinate_y = y?index:-index;
                }

                if (move_angle == 360 ||  move_angle == 180) {
                    coordinate_y = '0';
                    coordinate_x = x?index:-index;
                }
                return [x, y,ang]
            }

            var timer = setInterval(function () {

                self.drawTurntable();
                self.drawWinArea(coordinate_x, coordinate_y, (100-index)/100);
                index ++;
                coordinate.apply(null, coordinate_param)
                if (index == 120) {
                    clearInterval(timer);
                    //self.reload()
                }
            }, 10)

        },

        // 角度换弧度
        angleToRadian: function (angle) {
            return (Math.PI/180)*angle
        },

        // 选中之后重新加载
        reload (selectIndex) {
            this.prize.splice(this.selectIndex-1,1);
            this.length = this.prize.length;
            this.radian = Math.PI * 2 / this.length;
            this.angle = 360/this.length;

            this.selectIndex = selectIndex || this.prize.length; // 新的奖品

            this.drawTurntable(1);
        },

        // 选中之后转盘过渡
        turnTableAnim () {

        }

    }

    /*
    * @class
    * @des 旋转角度
    *
    * */
    class Rotate {
        constructor (dom, prize) {
            this.dom = dom;
            this.length = prize.length;
        }
        transition (angle) {
            this.dom.style = `transform:rotate(${angle}deg)`;
            setTimeout( () => {
                if(this.length > 1){
                    Draw.transition()
                }
            }, 1000)
        }

        // 根据奖品确定旋转角度
        angle (selectIndex, prize) {
            this._angle = 360/this.length;
            let prize_angle = (360 - (selectIndex*this._angle - this._angle/2)-90 ) + 360*10;
            //this.dom.style.cssText = 'transition: all 1s ease-in-out'
            this.length -- ;
            this.transition(prize_angle);

        }

        reset () {
            this.dom.style = 'transition: all 0s ease'
            
        }

    }

    /*
    * @Class
    * @param {Object} option 参数
    * */
    class TurnTable {

        constructor (option) {
            this.canvas = option.ele;
            this.prize = option.prize; // 奖品列表
            this.selectIndex = option.selectIndex; // 中奖产品序数
            this.rotate = new Rotate(this.canvas, this.prize, this.selectIndex)
            this.imgDom = document.querySelectorAll('.prize__img');

            this.loadAllImg().then(() => {
                this.init();
            })

        }
        init () {
            Draw.init(this.canvas, this.prize, this.selectIndex, this.imgDom);
        }
        loadAllImg () {
            let prize = this.prize, str = '', wrap = document.createElement('div');
            var arr = prize.map((v) => {
                return new Promise((reslove, reject) => {
                    var img = new Image();
                    img.onload = function () {
                        reslove()
                    }
                    img.src = v.image;
                })
            })

            prize.forEach((v) => {
                str += `<img src=${v.image} class="prize__img ${v.class}">`
            })

            wrap.style.display = 'none';
            wrap.classList.add('prize__img__wrap');
            wrap.innerHTML = str;
            document.body.appendChild(wrap);
            this.imgDom = document.querySelectorAll('.prize__img');

            return Promise.all(arr)
        }
        luckDraw (callback) {
            this.rotate.angle(this.selectIndex, callback);
        }
        reload (selectIndex) {
            this.rotate.reset();
            this.selectIndex = selectIndex;
            Draw.reload(selectIndex)
        }

    }

export default TurnTable;