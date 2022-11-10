# Typesecipt 报错 #

### TS2339:报错Property '属性' does not exist on type '{}'
1. ts某个方法（a）里面返回一个对象有属性b，在另一个方法里调用a().b，可以正常打印出结果，但是编译报错。报错信息：TS2339:报错Property 'b' does not exist on type '{}'，后来改写成a()[b]，成功去掉报错，耶！
2. 
  ``` typescript
      getSuccessor(delNode: BSNode | null) {
          let successor = delNode,
            current = delNode!.right || null,
            successorP = delNode
          while (current != null) {
            successorP = successor
            successor = current
            current = current.left  // 这里报错 current = current['left'] 
          }
          if (successor != delNode!.right) {
            successorP!.left = successor!.right
            successor!.right = delNode!.right
          }
          return successor
        }

  ```


### error TS2531: Object is possibly 'null'. 或者 error TS2322: Type 'BSNode | null' is not assignable to type 'null'.  

1. 

    ``` typescript 
      if (current === this.root) {
        this.root = successor
      } else if (isLeft) {
        parent.left = successor  // error parent!.left = successor
      }
    ```

### error TS2322: Type 'BSNode' is not assignable to type 'null'.
  ``` javascript
      at createTSError (D:\nvm\v14.1.0\node_modules\ts-node\src\index.ts:859:12)
      at reportTSError (D:\nvm\v14.1.0\node_modules\ts-node\src\index.ts:863:19)
      at getOutput (D:\nvm\v14.1.0\node_modules\ts-node\src\index.ts:1077:36)
      at Object.compile (D:\nvm\v14.1.0\node_modules\ts-node\src\index.ts:1433:41)
  ```  
  ``` typescript 
        let successor = this.getSuccessor(current)
        console.log(137, successor, isLeft, parent!.left)
        if (!parent) return
        if (current === this.root) {
          this.root = successor
        } else if (isLeft) {
          if (parent!.left && successor) {
            parent!.left = successor   // error there  => let successor:any = this.getSuccessor(current)
          }
        }

  ```


