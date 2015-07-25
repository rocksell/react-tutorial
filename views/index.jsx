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
  render: function() {
    var todo = this.props.data.map(function(obj) {
        return <Todo title={obj.title} key={obj.title}>{obj.detail}</Todo>
    });
    return (
      <div className = "todoList">
        <table style={style.tableContentBold}>
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
  propTypes: {
        title: React.PropTypes.string.isRequired
  },
  render: function() {
    return (
      <tr style= {this.state.itemToDoStyle}>
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
