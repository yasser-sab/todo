const app=new Vue({
    el:'#app',
    data:{
        newTodo:'',
        todoList:[],
        active:false
    },
    mounted(){
        this.todoList=JSON.parse(localStorage.todos);
    },
    watch:{
        todoList:{
            handler(){
                this.count();
            },
            deep:true
        }
    },
    methods:{
        add(){
            this.todoList.push({
                title:this.newTodo,
                done:false
            });
            localStorage.todos=JSON.stringify(this.todoList);
            this.newTodo="";
        },
        remove(todo){
            const rTodo=this.todoList.indexOf(todo);
            this.todoList.splice(rTodo,1);
            localStorage.todos=JSON.stringify(this.todoList);
        },
        done(){
            this.todoList.forEach(todo=>{
                todo.done=true;
            });
        },
        clear(){
            this.todoList.filter(t=>{return t.done}).forEach(t=>{

                this.remove(t);
            });
        },
        count(){
            return this.todoList.filter(t=>{return !t.done}).length;
        },
        check(object){
            switch(object){
                case 'all':
                    this.todoList=JSON.parse(localStorage.todos);
                    break;
                case 'active':
                    this.todoList=JSON.parse(localStorage.todos);
                    this.todoList=this.todoList.filter(t=>{return !t.done});
                    break;
                case 'completed':
                    this.todoList=JSON.parse(localStorage.todos);
                    this.todoList=this.todoList.filter(t=>{return t.done});
                    break;
                default:break;
            }
        },
        complete(e){
            localStorage.todos=JSON.stringify(this.todoList);
        },
        bg_mode(e) {
            const icon=e.target.src.indexOf('moon')!==-1?'sun':'moon';

            if(icon==='moon'){
                document.documentElement.style.setProperty('--c1','white');
                document.documentElement.style.setProperty('--c2','hsl(236, 33%, 92%)');
                console.log(window.getComputedStyle(document.body).getPropertyValue('--bg-image').trim());
                if(window.getComputedStyle(document.body).getPropertyValue('--bg-image').trim().indexOf('mobile')!==-1){
                    document.documentElement.style.setProperty('--bg-image','url("images/bg-mobile-light.jpg")');
                }
                else{
                    document.documentElement.style.setProperty('--bg-image','url("images/bg-desktop-light.jpg")');
                }
            }else{
                document.documentElement.style.setProperty('--c1','');
                document.documentElement.style.setProperty('--c2','');
                document.documentElement.style.setProperty('--c3','');
                document.documentElement.style.setProperty('--bg-image','');

            }

            e.target.src=`./images/icon-${icon}.svg`;
        }
    }
});