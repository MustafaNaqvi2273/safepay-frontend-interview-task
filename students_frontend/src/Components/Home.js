import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { getAllStudents, createNewStudent, updateStudent, deleteStudent } from "../Store/actions/activity";
import Header from "./Header";
import 'antd/dist/antd.css';
import { Table, Button, Modal, Input, Popconfirm, Select } from 'antd';
import LoadingOverlay from 'react-loading-overlay';

const Home = (props) => {
  const [allStudents, setAllStudents] = useState([]);
  const [data, setData] = useState([]);
  const [stduentToDelete, setStudentToDelete] = useState({});
  const [isActive, setIsActive] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [gpaError, setGpaError] = useState('');
  const [editStudent, setEditStudent] = useState(false);
  const [emptyData] = useState({
    name:'',
    age:'',
    sex:'',
    class:'',
    gpa:'',
    siblings: 0
  })
  const [newStudent, setNewStudent] = useState({
    name:'',
    age:1,
    sex:'',
    class:1,
    gpa:'',
    siblings: 0
  })
  const { Search } = Input;
  const { Option } = Select;
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Gender',
      dataIndex: 'sex',
      key: 'sex',
    },
    {
      title: 'Class',
      dataIndex: 'class',
      key: 'class',
    },
    {
      title: 'GPA',
      dataIndex: 'gpa',
      key: 'gpa',
    },
    {
      title: 'EDIT',
      render: (text, record, index) => <div>
        <Button type="primary" onClick = {() => toggleEditState(record)}>Edit</Button>
        </div>
    },
    {
      title: 'DELETE',
      render: (text, record, index) => <div>
        <Popconfirm
          title="Are you sure to delete this student?"
          onConfirm={deleteStudent}
          onCancel={cancelDelete}
          okText="Yes"
          cancelText="No"
        >
          <Button type="primary" danger={true} onClick = {
            (e) => {
              setStudentToDelete(record)
            }
          }>Delete</Button>
        </Popconfirm>
        </div>
    }
  ];

  const cancelDelete = () => {
    setStudentToDelete({})
  }

  const deleteStudent = () => {
    props.deleteStudent(stduentToDelete)
  }

  const showModal = () => {
    setIsModalVisible(true);
  };
  const closeModal = () => {
    setIsModalVisible(false);
    setNewStudent(emptyData)
    setEditStudent(false)
    setGpaError('')
  };

  const toggleEditState = (record) => {
    setNewStudent(record)
    setEditStudent(true)
    showModal()
  }

  const resetFields = () => {
    setNewStudent(emptyData)
    setEditStudent(false)
    setGpaError('')
    closeModal()
  }

  const sortStudents = (value) => {
    if(value === 'sortByAge'){
      let temp = [...allStudents]
      temp.sort((a, b) => a.age - b.age);
      setAllStudents(temp)
    }
    if(value === 'sortByClass'){
      let temp = [...allStudents]
      temp.sort((a, b) => a.class - b.class);
      setAllStudents(temp)
    }
  }

  const createStudent = async() => {
    let gpaRegex = /^[0-4]\.\d\d|.\d$/;
    if(gpaRegex.test(newStudent.gpa)){
      await props.createNewStudent(newStudent)
      resetFields()
    }
    else{
      setGpaError('Please Enter a Valid GPA')
      setTimeout(() => {
        setGpaError('')
      }, 3000)
    }
  }

  const updateStudent = async() => {
    let gpaRegex = /^[0-4]\.\d\d|.\d$/;
    if(gpaRegex.test(newStudent.gpa)){
      await props.updateStudent(newStudent)
      resetFields()
    }
    else{
      setGpaError('Please Enter a Valid GPA')
      setTimeout(() => {
        setGpaError('')
      }, 3000)
    }
  }

  const fetchAllStudents = async() => {
    await props.getAllStudents()
    setAllStudents(props.students)
    setData(props.students)
    setIsActive(false)
  }

  const onSearch = (searchText) => {
    if(searchText !== ''){
      let temp = [...allStudents]
      temp = temp.filter((student) => student.name.toLowerCase().includes(searchText.toLowerCase()))
      setAllStudents(temp)
    }
    else{
      setAllStudents(data)
    }
  }

  const checkForEmptyInput = (text) => {
    if(text === ''){
      setAllStudents(data)
    }
  }

  useEffect(() => {
    fetchAllStudents()
  },[])

  useEffect(() => {
    setAllStudents(props.students)
    setData(props.students)
  },[props.students])

  const inputStyle = {
    padding: "10px",
    marginTop: "5px"
  };
  const headingStyle = {
    fontWeight: "bold",
    textAlign: "center"
  }
  const inputHeadingStyle = {
    fontWeight: 'bold',
    color: 'grey'
  }
  const errorStyle = {
    color: 'red',
    fontSize: '12px'
  }

  return(
    <div>
      <LoadingOverlay
        active={isActive}
        spinner
        styles={{
        wrapper: {
          height: '100%',
        }
      }}
        text='Loading your content...'
      >
        <Header onOpenModal={showModal}/>
        <div style={{display: 'flex', flexDirection: 'row'}}>
          <Search
            placeholder="search by Name"
            allowClear
            enterButton="Search"
            onSearch={(e) => onSearch(e)}
            onChange={(e) => checkForEmptyInput(e.target.value)}
            style={{ width: 300, padding: '10px' }}
          />
          <Select defaultValue="Sort" placeholder="Sort" style={{ width: 200, padding: '10px' }} onChange={(e) => sortStudents(e)} onClear={() => setAllStudents(data)} allowClear>
            <Option value="sortByAge" >Sort By Age</Option>
            <Option value="sortByClass" >Sort By Class</Option>
          </Select>
        </div>
        <Modal visible={isModalVisible} onCancel={closeModal}
          footer={[
            <Button key="back" onClick={closeModal}>
              Cancel
            </Button>,
            <Button key="submit" type="primary" onClick={editStudent ? updateStudent : createStudent}>
              {editStudent ? 'Update' : 'Submit'}
            </Button>
          ]}
        >
          <h3 style={headingStyle}>{editStudent ? 'UPDATE STUDENT' : 'ADD NEW STUDENT'}</h3>
          <div style={inputStyle}>
            <span style={inputHeadingStyle}>Name</span>
            <Input style={inputStyle} value={newStudent.name} placeholder="Name" onChange={(e) => setNewStudent({...newStudent, name:e.target.value})}/>
          </div>
          
          <div style={inputStyle}>
            <span style={inputHeadingStyle}>Age</span>
            <Input type="number" style={inputStyle} value={newStudent.age} placeholder="Age" onChange={(e) => setNewStudent({...newStudent, age:e.target.value})}/>
          </div>
          
          <div style={inputStyle}>
            <span style={inputHeadingStyle}>Gender</span>
            <Input style={inputStyle} value={newStudent.sex} placeholder="Gender" onChange={(e) => setNewStudent({...newStudent, sex:e.target.value})}/>
          </div>
          
          <div style={inputStyle}>
            <span style={inputHeadingStyle}>Class</span>
            <Input type="number" style={inputStyle} value={newStudent.class} placeholder="Class" onChange={(e) => setNewStudent({...newStudent, class:e.target.value})}/>
          </div>
          
          <div style={inputStyle}>
            <span style={inputHeadingStyle}>GPA</span>
            <div style={errorStyle}>{gpaError}</div>
            <Input style={inputStyle} value={newStudent.gpa} placeholder="GPA" onChange={(e) => setNewStudent({...newStudent, gpa:e.target.value})}/>
          </div>
          
          <div style={inputStyle}>
            <span style={inputHeadingStyle}>Siblings</span>
            <Input type="number" style={inputStyle} value={newStudent.siblings} placeholder="Siblings" onChange={(e) => setNewStudent({...newStudent, siblings:e.target.value})}/>
          </div>
        </Modal>
        <Table 
          dataSource={allStudents} 
          columns={columns} 
          pagination={false}
        />
      </LoadingOverlay>
    </div>
  )
}

const mapStateToProps = (state) => ({
  students: state.activityReducer.students
})

export default connect(mapStateToProps, {
  getAllStudents,
  createNewStudent,
  updateStudent,
  deleteStudent
})(Home);