## less使用 ##
### less中的注释 ###
1. 以//开头的注释不会被编译到css文件中
2. 以/**/包裹的注释会被编译到css文件中

### less变量的使用 ###
使用@申明变量(注意结尾分号)
  1.属性:@color: red;,使用:@color
  2.选择器:@m:margin,使用:@{m}
  3.URL,使用@{url}
  4.延时加载,当前作用域执行完成后渲染,多次赋值按最后一次渲染

### less中的嵌套规则 ###
1. 基本嵌套规则
2. &的使用
以上样例:
```less
<style lang="less" scoped>
@color:red;
@m: margin;
@wp: #wrap;
*{
  @{m}: 0;
  padding: 0;
}
@{wp} {
  position: relative;
  width: 200px;
  height: 200px;
  border: 2px;
  margin: 0 auto;
  .inner{
    @color: green;
    position:absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    background: @color;
    height: 50px;
    width: 50px;
    @color: blue;
    &:hover{
      background: pink
    }
  }
}
</style>
```

### less的混合 ###
1. 普通混合,会一起编译到css中
```less
<style lang="less" scoped>
//定义混合,抽取公共样式
.juzhong{
  position:absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  background: red;
  height: 50px;
  width: 50px;
}
#wrap {
  position: relative;
  width: 200px;
  height: 200px;
  border: 2px;
  margin: 0 auto;
  .inner{
    .juzhong
  }
  .inner2{
    .juzhong
  }
}
</style>
```
2. 不带输出混合,加(),不会输出到css中
```less
<style lang="less" scoped>
//定义混合,抽取公共样式
.juzhong(){
  position:absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  background: red;
  height: 50px;
  width: 50px;
}
</style>
```
3. 带参数的混合
```less
<style lang="less" scoped>
.juzhong(@w,@h,@c){
  position:absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  background: @c;
  height: @h;
  width: @w;
}
#wrap {
  position: relative;
  width: 200px;
  height: 200px;
  border: 2px;
  margin: 0 auto;
  .inner{
    .juzhong(40px,20px,pink);
  }
  .inner2{
    .juzhong(20px,40px,deeppink);
  }
}
</style>
```
4. 带多参数并且有默认值得混合
```less
<style lang="less" scoped>
.juzhong(@w:30px,@h:50px,@c:pink){
  position:absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  background: @c;
  height: @h;
  width: @w;
}
#wrap {
  position: relative;
  width: 200px;
  height: 200px;
  border: 2px;
  margin: 0 auto;
  .inner{
    .juzhong();
  }
  .inner2{
    .juzhong(20px,40px,deeppink);
  }
}
</style>
```
5. 命名参数,通过调用混合时指定参数进行传参,其余按默认值处理
```less
<style lang="less" scoped>
.juzhong(@w:30px,@h:50px,@c:pink){
  position:absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  background: @c;
  height: @h;
  width: @w;
}
#wrap {
  position: relative;
  width: 200px;
  height: 200px;
  border: 2px;
  margin: 0 auto;
  .inner{
    .juzhong(@c:black);
  }
  .inner2{
    .juzhong(20px,40px,deeppink);
  }
}
</style>
```
6. 匹配模式
```less
//匹配默认默认调用(注意添加@_):.triangle(@_){}
.triangle(@_){
    width: 0px;
    height: 0px;
    overflow: hidden;
}
//匹配模式L
.triangle(L,@w,@c){
    border-width: @w;
    border-style: dashed solid dashed dashed;
    border-color: transparent @c transparent transparent ;
}
//匹配模式R
.triangle(R,@w,@c){
    border-width: @w;
    border-style: dashed dashed dashed solid;
    border-color: transparent transparent transparent @c;
}
```
7. arguments变量,按形参顺序依次赋值
```less
<style lang="less" scoped>
.border(@1,@2,@3){
  border: @arguments;
}
#wrap{
  .sjx{
    .border(2px,solid,black)
  }
}
</style>
```

### less的运算 ###
```less
<style lang="less" scoped>
#wrap{
  .sjx{
    width: (100 + 200px);
  }
}
</style>
```

### less避免编译 ###
