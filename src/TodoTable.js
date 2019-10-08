import React from 'react';
import {Table,Typography,Button} from 'antd';

const { Text } = Typography;

class TodoTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {todos: props.todos};
    }

    render() {
        const columns = [
            {
                title: 'Todo',
                dataIndex: 'todo',
                key: 'todo'

            },
            {
                title: 'Change Status',
                dataIndex: 'status',
                key: 'status',
                fixed: 'right',
                width: 100
            },
            {
                title: 'Action',
                dataIndex: 'deleteTodo',
                key: 'deleteTodo',
                fixed: 'right',
                width: 100,
            }

        ];

        const data = this.state.todos.map(element =>{
            let todo;
            let status;
            if( element.todo_completed === true){
                todo =  <Text delete copyable>{element.todo_name}</Text>;
                status = <Button style={{ width:100, height:30}} type="default" size={"small"} onClick={() => {this.props.onUpdate(element._id)}}>Uncomplete</Button>;

            }else{
                todo =  <Text copyable>{element.todo_name}</Text>;
                status = <Button style={{ width:100, height:30 }} type="primary" size={"small"} onClick={() => {this.props.onUpdate(element._id)}}>Complete</Button>;
            }
            const deleteTodo = <Button type="danger" size={"small"} onClick={() => {this.props.onDelete(element._id)}}>Delete</Button>;
            return { todo: todo ,status: status, deleteTodo:deleteTodo };
        });

        return (<Table columns={columns} dataSource={data} size={'small'} />
        )
    }
} export default TodoTable;