import React from 'react';
import {Layout} from 'antd';
import TodoTable from "./TodoTable";
import Loading from "./Loading";
import {Input, Button } from 'antd';
import logo from './assets/gtr.png';
import {backendUrl} from './Helper';

const { Header, Content, Footer } = Layout;

class Todo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {todos: [], newTodo:'', isLoading: true};
        this.onUpdate = this.onUpdate.bind(this);
        this.loadTodosFromServer = this.loadTodosFromServer.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.addTodo = this.addTodo.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }

    componentDidMount() {
        this.loadTodosFromServer();
    }

    loadTodosFromServer() {
        this.setState({isLoading: true});
        fetch(backendUrl()+'todos')
            .then(response => response.json())
            .then(todos => this.setState({todos: todos , isLoading: false}));
    }

    onUpdate(id){
        console.log(id);
        fetch(backendUrl()+'todos/update/'+id,{method: 'POST', headers:{"Content-type":"application/json; charset=UTF-8"}})
            .then(response=>{
                console.log(response);
                this.loadTodosFromServer();
            });
    }

    handleChange(event) {
        this.setState({newTodo:event.target.value});

    }

    handleKeyPress = event => {
        if (event.key === 'Enter') {
            this.addTodo();
        }
    };

    addTodo() {
        if(this.state.newTodo !== '' && this.state.newTodo.trim() !== ''){
            fetch(backendUrl()+'todos/add' ,{method: 'POST', headers:{"Content-type":"application/json; charset=UTF-8"},  body:JSON.stringify({todo_name: this.state.newTodo})} )
                .then(response=>{if (response.status===200)
                    alert("todo added successfully");
                    this.setState({newTodo: ''});
                    this.loadTodosFromServer();
                });
        }else{
            alert("todo can not be empty");
        }

    }

    onDelete(id) {
        if(window.confirm("Are you sure want to delete?")){
            fetch(backendUrl()+'todos/delete/'+id,{method: 'DELETE', headers:{"Content-type":"application/json; charset=UTF-8"}})
                .then(response=>{
                    console.log(response);
                    this.loadTodosFromServer();
                });

        }}

    render() {
        if(this.state.isLoading){
            return <Loading/>;
        }

        return (
        <Layout className="layout">
            <Header style={{textAlign:'center',position:'fixed', left:'0', height:'70px', width:'100%',backgroundColor:'#5D3EBD'}}>

                <div id="logo">
                    <img src={logo} alt="Logo" />
                </div>


            </Header>
            <Content style={{ position:'absolute', top:'70px',bottom:'70px',width:'100%',overflow:'auto'}}>
                    <br/>
                    <p style={{ position:'relative', width:'30%', left:'35%', textAlign:'center'}}>
                        <Input size={'large'} type="text" name="newTodo" value={this.state.newTodo} onKeyPress={this.handleKeyPress} onChange={this.handleChange} placeholder="Write Todo" />
                        <Button type="default" size={'large'} style={{backgroundColor:'#FFD00F'}} onClick={this.addTodo}>Add Todo</Button>
                    </p>

                <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
                    <TodoTable todos={this.state.todos} onUpdate={this.onUpdate} onDelete={this.onDelete}/>
                </div>
            </Content>
            <Footer style={{backgroundColor:'#5D3EBD', position:'fixed', left:'0', height:'70px', width:'100%', bottom:'0', top:'auto', textAlign: 'center',fontSize:'20px' }}><text style={{color:'white'}}>Ozan Aydın</text></Footer>
        </Layout>
        );
    }
}

export default Todo;
