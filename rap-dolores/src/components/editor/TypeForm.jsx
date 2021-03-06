import React, { Component } from 'react'
import { PropTypes, connect, Link, Mock } from '../../family'

// 模拟数据
const mockType = process.env.NODE_ENV === 'development'
  ? () => Mock.mock({
    name: '分类@CTITLE(4)',
    repositoryId: undefined,
    moduleId: undefined,
  })
  : () => ({
    name: '',
    repositoryId: undefined,
    moduleId: undefined,
  })

// 展示组件
class TypeForm extends Component {
  static contextTypes = {
    rmodal: PropTypes.object.isRequired,
    onAddType: PropTypes.func.isRequired,
    onUpdateType: PropTypes.func.isRequired
  }
  static propTypes = {
    auth: PropTypes.object.isRequired,
    repository: PropTypes.object.isRequired,
    mod: PropTypes.object.isRequired,
    type: PropTypes.object,
  }
  constructor (props) {
    super(props)
    console.log('----', this.props);
    let { type } = this.props
    this.state = type ? { ...type } : mockType()
  }
  render () {
    const { rmodal } = this.context
    return (
      <section>
        <div className='rmodal-header'>
          <span className='rmodal-title'>{this.props.title}</span>
        </div>
        <form className='form-horizontal w600' onSubmit={this.handleSubmit}>
          <div className='rmodal-body'>
            <div className='form-group row'>
              <label className='col-sm-2 control-label'>名称：</label>
              <div className='col-sm-10'>
                <input name='name' tabIndex={1} value={this.state.name} onChange={e => this.setState({ name: e.target.value })} className='form-control' placeholder='Name' spellCheck='false' autoFocus='true' required />
              </div>
            </div>
          </div>
          <div className='rmodal-footer'>
            <div className='form-group row mb0'>
              <label className='col-sm-2 control-label' />
              <div className='col-sm-10'>
                <button type='submit' className='btn btn-success w140 mr20'>提交</button>
                <Link to='' onClick={e => { e.preventDefault(); rmodal.close() }} className='mr10'>取消</Link>
              </div>
            </div>
          </div>
        </form>
      </section>
    )
  }
  handleSubmit = (e) => {
    e.preventDefault()
    let { onAddType, onUpdateType } = this.context
    let { auth, mod, repository } = this.props
    let onAddOrUpdateType = this.state.id ? onUpdateType : onAddType
    let type = Object.assign({}, this.state, {
      creatorId: auth.id,
      repositoryId: repository.id,
      moduleId: mod.id,
    })
    let { rmodal } = this.context
    rmodal.close()
    onAddOrUpdateType(type, () => {
      if (rmodal) rmodal.resolve()
    })
  }
}

// 容器组件
const mapStateToProps = (state) => ({
  auth: state.auth
})
const mapDispatchToProps = ({})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TypeForm)
