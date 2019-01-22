import React, { Component } from 'react'
import { PropTypes, connect, Link, URI, replace, StoreStateRouterLocationURI } from '../../family'
import { RModal, RSortable } from '../utils'
import TypeForm from './TypeForm'
import { GoPencil, GoTrashcan, GoPackage } from 'react-icons/lib/go'

class Type extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    mod: PropTypes.object.isRequired,
    type: PropTypes.object.isRequired,
    repository: PropTypes.object.isRequired,
  }
  static contextTypes = {
    store: PropTypes.object,
    onDeleteType: PropTypes.func
  }
  constructor (props) {
    super(props)
    this.state = { update: false }
  }
  render () {
    let { store } = this.context
    let { auth, mod, type, repository } = this.props
    let uri = StoreStateRouterLocationURI(store).removeSearch('itf')
    let selectHref = URI(uri).setSearch('type', type.id).href()
    return (
      <div className='Module clearfix'>
        <Link to={selectHref} className='name'>{type.name}</Link>
        <div className='toolbar'>
          {/* 编辑权限：拥有者或者成员 */}
          {repository.owner.id === auth.id || repository.members.find(itme => itme.id === auth.id)
            ? <span className='fake-link' onClick={e => this.setState({ update: true })}><GoPencil /></span>
            : null
          }
          {repository.owner.id === auth.id || repository.members.find(itme => itme.id === auth.id)
            ? <span className='fake-link' onClick={e => this.handleDelete(e, mod)}><GoTrashcan /></span>
            : null
          }
        </div>
        <RModal when={this.state.update} onClose={e => this.setState({ update: false })} onResolve={this.handleUpdate}>
          <TypeForm title='修改分类' mod={mod} type={type} repository={repository} />
        </RModal>
      </div>
    )
  }
  handleUpdate = (e) => {
    let { store } = this.context
    store.dispatch(replace(StoreStateRouterLocationURI(store).href()))
  }
  handleDelete = (e, type) => {
    e.preventDefault()
    let message = `分类被删除后不可恢复，并且会删除相关的接口！\n确认继续删除『#${type.id} ${type.name}』吗？`
    if (window.confirm(message)) {
      this.context.onDeleteType(this.props.type.id, () => {
        let { store } = this.context
        let uri = StoreStateRouterLocationURI(store)
        let deleteHref = this.props.active ? URI(uri).removeSearch('type').href() : uri.href()
        store.dispatch(replace(deleteHref))
      }, this.props.repository.id)
    }
  }
}

class ModuleList extends Component {
  static contextTypes = {
    store: PropTypes.object.isRequired,
    onSortModuleList: PropTypes.func.isRequired
  }
  static propTypes = {
    auth: PropTypes.object.isRequired,
    repository: PropTypes.object.isRequired,
    mod: PropTypes.object.isRequired,
    types: PropTypes.array,
    type: PropTypes.object
  }
  static childContextTypes = {}
  getChildContext () {}
  constructor (props) {
    super(props)
    this.state = { create: false }
  }

  render () {
    let { auth, repository = {}, types = [], type = {}, mod = {} } = this.props
    let isOwned = repository.owner.id === auth.id
    let isJoined = repository.members.find(itme => itme.id === auth.id)
    return (
      <RSortable onChange={this.handleSort} disabled={!isOwned && !isJoined}>
        <ul className='ModuleList clearfix TypeList'>
          {types.map((item, index) =>
            <li key={item.id} className={item.id === type.id ? 'active sortable' : 'sortable'} data-id={item.id}>
              <Type key={item.id} mod={mod} type={item} active={item.id === type.id} repository={repository} auth={auth} />
            </li>
          )}
          {/* 编辑权限：拥有者或者成员 */}
          {isOwned || isJoined
            ? <li>
               <span className='fake-link' onClick={e => this.setState({ create: true })}>
                <GoPackage className='fontsize-14' /> 新建分类
              </span>
              <RModal when={this.state.create} onClose={e => this.setState({ create: false })} onResolve={this.handleCreate}>
                <TypeForm title='新建分类' repository={repository} mod={mod} />
              </RModal>
            </li> : null
          }
        </ul>
      </RSortable>
    )
  }
  handleSort = (e, sortable) => {
    let { onSortModuleList } = this.context
    onSortModuleList(sortable.toArray())
  }
  handleCreate = () => {
    let { store } = this.context
    store.dispatch(replace(StoreStateRouterLocationURI(store).href()))
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
})
const mapDispatchToProps = ({})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModuleList)
