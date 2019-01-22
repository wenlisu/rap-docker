import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ReactMarkdown from 'react-markdown'
import clipboard from "clipboard-polyfill"
import { message } from 'antd';
import { GoClippy } from 'react-icons/lib/go'
import { Tree } from '../utils'
import './PropertyGenerate.css'

class PropertyGenerate extends Component {

  static propTypes = {
    scope: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired,
  }
  static contextTypes = {
    rmodal: PropTypes.instanceOf(Component),
  }
  constructor(props) {
    super(props);
    this.state = {
      html: null,
    };
  }
  componentDidMount() {
    let params = Tree.arrayToTree(this.props.data);
    this.setState({
      html: `${Tree.JsonToTs(params, this.props.scope)}`,
    });
  }
  render () {
    const input = '```js' + `\n${this.state.html}\n` + '```';
    return (
      <div>
        <ReactMarkdown source={input} className={'modal'} />
        <button type='button' className={`btn btn-secondary copy`} onClick={this.handleClippyButton}>
          <GoClippy className='fontsize-14' /> 复制
        </button>
      </div>
    )
  }
  handleClippyButton = () => {
    clipboard.writeText(`${this.state.html}`).then(() => {
      message.success('复制成功', 1);
    }).catch(() => {
      message.warning('复制失败', 1);
    });
  }
  componentDidUpdate () {
    this.context.rmodal.reposition()
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
})
const mapDispatchToProps = ({})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PropertyGenerate)
