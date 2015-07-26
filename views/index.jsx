var React = require('react');

var TodoBox = React.createClass({
  render: function() {
    return (
      <div className="todoBox">
        <h1>Todos</h1>
        <TodoList data = {this.props.data}></TodoList>
        <TodoForm></TodoForm>
      </div>
    );
  }
});


var TodoList = React.createClass({ 
  getInitialState: function() { 
    return { 
      data: this.props.data, 
      titleValue: "", 
      detailValue: "" 
    }; 
  }, 
  changeTitle: function(e) { 
    this.setState({
      titleValue: e.target.value
    });
  }, 
  changeDetail: function(e) { 
    this.setState({
      detailValue: e.target.value
    }); 
  }, 
  addTodo: function() {
    var newData = this.state.data;
    newData.push({ title:titleValue, detail: detailValue}); 
    this.setState({
      data: newData
    });
    this.setState({
      titleValue:"",
      detailValue:""
    });
  },
  onDelete: function(title) {
    var newData = this.state.data.filter(function(toDo){
      return toDo.title !== title;
    });
    this.setState({
      data: newData
    });
  }, 
  render: function() { 
    var todo = this.state.data.map(function(obj) { 
      return <Todo title={obj.title} key={obj.title}>{obj.detail}</Todo>; 
    }.bind(this)); 
    return ( 
      <div className = "todoList"> 
        <div> 
          Title:<input type="text" value={this.state.titleValue} onChange={this.changeTitle} /> 
          Detail:<input type="text" value={this.state.detailValue} onChange={this.changeDetail} /> 
          <button onClick={this.addTodo}>Add</button> 
        </div> 
        <table style={{border: "2px solid black"}}> 
          <tbody> 
            {todo} 
          </tbody> 
        </table> 
      </div> 
    ); 
  } 
});

var Todo = React.createClass({
  getInitialState : function() {
    return {
      checked: false,
      itemToDoStyle: style.notCheckedTodo
    };
  },
  handleChange : function(e) {
    this.setState({
      checked: e.target.checked,
      itemToDoStyle: e.target.checked ? style.checkedTodo : style.notCheckedTodo
    });
  },
  _onDelete: function() {
    this.props.onDelete(this.props.tittle);
  },
  propTypes: {
    title: React.PropTypes.string.isRequired,
    onDelete: React.PropTypes.string.isRequired
  },
  render: function() {
    return (
      <tr style= {this.state.itemToDoStyle}>
        <td style={style.tableContent}><button onClick="this._onDelete">X</button></td>
        <td style={style.tableContent}><input type="checkbox" checked={this.state.checked} onChange={this.handleChange} /></td>
        <td style={style.tableContent}>{this.props.title}</td>
        <td style={style.tableContent}>{this.props.children}</td>
      </tr>
    );
  }
});

var TodoForm = React.createClass({
  render: function() {
    return(
      <div className="todoForm">I am a TodoForm.</div>
    );
  }
});

var style = { 
  checkedTodo: { 
    textDecoration: "line-through" 
  }, 
  notCheckedTodo: { 
    textDecoration: "none" 
  }, 
  tableContent: { 
    border: "1px solid black" 
  },
  tableContentBold: {
    border: "2px solid black"
  }
};


module.exports = TodoBox;