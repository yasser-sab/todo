const app=new Vue({
    el:'#app',
    data:{
        newTodo:'',
        todoList:[]
    },
    methods:{
        add(){
            this.todoList.push({
                title:this.newTodo,
                done:false
            });
            this.newTodo="";
        },
        remove(todo){
            const rTodo=this.todoList.indexOf(todo);
            this.todoList.splice(rTodo,1);
        },
        done(){
            this.todoList.forEach(todo=>{
                todo.done=true;
            });
        }
    }
});