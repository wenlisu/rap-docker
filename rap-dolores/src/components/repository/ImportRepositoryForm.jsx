import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Upload, Button, Icon, message } from 'antd';
import './ImportRepositoryForm.css'
import { importRepository, fetchRepositoryList } from '../../actions/repository'

class ImportRepositoryForm extends Component {
  static contextTypes = {
    rmodal: PropTypes.object.isRequired
  }
  static propTypes = {
    orgId: PropTypes.number.isRequired,
    importRepository: PropTypes.func.isRequired
  }
  constructor (props) {
    super(props)
    this.state = {
      orgId: props.orgId,
      version: 1,
      docUrl: '',
      disableSubmit: false,
      fileList: [],
    }
  }

  uploadProps = () => {
    const { fileList } = this.state;
    return {
      onRemove: (file) => {
        this.setState((state) => {
          const index = state.fileList.indexOf(file);
          const newFileList = state.fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList,
          };
        });
      },
      beforeUpload: (file) => {
        this.setState(state => ({
          fileList: [...state.fileList, file],
        }));
        return false;
      },
      fileList,
    }
  }
  render () {
    const { rmodal } = this.context
    const { disableSubmit } = this.state
    return (
      <section className='ImportRepositoryForm'>
        <div className='rmodal-header'>
          <span className='rmodal-title'>{this.props.title}</span>
        </div>
        <form className='form-horizontal' onSubmit={this.handleUpload} >
          <div className='rmodal-body'>
            <div className='form-group row'>
              <label className='col-sm-2 control-label'>文档</label>
              <div className='col-sm-10'>
                <Upload {...this.uploadProps()}>
                  <Button>
                    <Icon type="upload" /> Upload
                  </Button>
                </Upload>
              </div>
            </div>
            <div>
              <div className='form-group row mb0'>
                <label className='col-sm-2 control-label' />
                <div className='col-sm-10'>
                  <button type='submit' id='btnSubmitImportRAP' className='btn btn-success w140 mr20' disabled={disableSubmit}>{disableSubmit ? '导入中，请稍等...' : '提交'}</button>
                  <Link to='' onClick={e => { e.preventDefault(); rmodal.close() }} className='mr10'>取消</Link>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    )
  }

  componentDidUpdate () {
    this.context.rmodal.reposition()
  }

  readFile = (file) => {
    return new Promise((resolve, reject) => {
        let reader = new FileReader()
        reader.readAsText(file, 'UTF-8');
        reader.onload = e => {
          resolve(e.target.result)
        }
    })
  }

  handleUpload = async (e) => {
    e.preventDefault()
    const { fileList, orgId } = this.state;
    if (fileList.length > 0) {
      this.setState({
        disableSubmit: true
      })
      let resultData = {};
      for(let i in fileList) {
        if (fileList[i]) {
          resultData[fileList[i].name] = await this.readFile(fileList[i]).then(result => result);
        }
      }
      // console.log(JSON.parse(resultData['controller.md']));
      // console.log(JSON.parse(resultData['dto.txt']));
      // console.log(JSON.parse(resultData['enum.txt']));
      // console.log(JSON.parse(resultData['topic.txt']));
      this.props.importRepository({ tsjson: JSON.parse(resultData['controller.md'] || null), dtoJson: JSON.parse(resultData['dto.txt'] || null), enumJson: JSON.parse(resultData['enum.txt'] || null), cJson: JSON.parse(resultData['topic.txt'] || null),  orgId }, (res) => {
        if (res.isOk) {
          this.context.rmodal.resolve()
          this.setState({
            disableSubmit: false
          })
        } else {
          console.log(res.message)
        }
      })
    } else {
      message.error('请先选择JSON文档');
    }
  }
}

// 容器组件
const mapStateToProps = (state) => ({
})

const mapDispatchToProps = ({
  importRepository,
  fetchRepositoryList
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ImportRepositoryForm)
