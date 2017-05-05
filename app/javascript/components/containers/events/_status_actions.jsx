var EventStatusActions = React.createClass({
  getDefaultProps() {
    return {
      baseClassNames: 'btn btn-sm btn-default',
      statusItems: [
        { label: 'Not Going', value: 0, icon: 'icon-cancel-1' },
        { label: 'Interested', value: 1, icon: 'icon-bookmark' },
        { label: 'Going', value: 2, icon: 'icon-ok' }
      ]
    }
  },
  getInitialState() {
    return {
      currentStatusItem: this.props.status[0]
    }
  },
  handleClick(e, value) {
    e.preventDefault();
    this.setState({currentStatusItem: value});
    var _this = this;
    var originalState = this.state.currentStatusItem;
    var formData = new FormData();
    var url = '/events/' + this.props.eventId +'/change_status';
    formData.append('event[status]', value);

    fetch(url, {
      method: 'POST',
      body: formData,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRF-Token': _this.props.authenticityToken
      },
      credentials: 'same-origin'
    }).then(function(response) {
      if(response.status !== 200) {
        _this.setState({currentStatusItem: originalState});
      }
    });
  },
  constructClassName(value) {
    return this.props.baseClassNames + ' ' +
          ((this.state.currentStatusItem == value) ? 'active' : '');
  },
  render() {
    var _this = this;
    var statusItems = this.props.statusItems.map(function(statusItem) {
      return (
        <a key={statusItem.value} className={_this.constructClassName(statusItem.value)} href='#' onClick={(evt) => _this.handleClick(evt, statusItem.value)}>
          <i className={statusItem.icon}></i> {statusItem.label}
        </a>
      )
    });
    return (
      <div className="status-actions">
        {statusItems}
      </div>
    )
  }
});

module.exports = EventStatusActions;
