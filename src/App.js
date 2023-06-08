import { Button, Space, Table,Tooltip } from 'antd';
import { useState,useEffect} from 'react';
import Api from './Api'



  const App = () => {
      const [filteredInfo, setFilteredInfo] = useState({});
      const [sortedInfo, setSortedInfo] = useState({});
      const [data, setData] = useState([]);

  useEffect(() => {
      const fetchData = async () => {
      const allData = await Api();
      console.log("allDatas", allData)
      setData(allData?.data ? allData.data : [])
    }
      fetchData()
      
      .catch(console.error);
  
  },[])

  const handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };
  const clearFilters = () => {
    setFilteredInfo({});
  };
  const clearAll = () => {
    setFilteredInfo({});
    setSortedInfo({});
  };
  const setAgeSort = () => {
    setSortedInfo({
      order: 'descend',
      columnKey: 'age',
    });
  };
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      filters: [
        {
          text: 'Joe',
          value: 'Joe',
        },
        {
          text: 'Jim',
          value: 'Jim',
        },
      ],
      filteredValue: filteredInfo.name || null,
      onFilter: (value, record) => record.name.includes(value),
      sorter: (a, b) => a.name.length - b.name.length,
      sortOrder: sortedInfo.columnKey === 'name' ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: 'DOB',
      dataIndex: 'date_of_birth',
      key : 'date_of_birth',
      sorter: (a, b) => a.date_of_birth - b.date_of_birth,
      sortOrder: sortedInfo.columnKey === 'date_of_birth' ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      filters: [
        {
          title: 'Email',
          dataIndex: 'email',
        },
        {
          title: 'Email',
          dataIndex: 'email',
        },
      
      ],
      filteredValue: filteredInfo.email || null,
      onFilter: (value, record) => record.email.includes(value),
      sorter: (a, b) => a.email.length - b.email.length,
      sortOrder: sortedInfo.columnKey === 'address' ? sortedInfo.order : null,
      ellipsis: true,
    },

    {
      title: 'Image',
      dataIndex: 'imageUrl',
      key: 'imageUrl',
    
      render: (imageUrl) => (
        <Tooltip placement="topLeft" title={imageUrl}>
      <img height={100} src={imageUrl} alt="Image description" />
    </Tooltip>

      ),
    },
  ];
  return (
    <>
      <Space
        style={{
          marginBottom: 16,
        }}
      >
        <Button onClick={setAgeSort}>Sort date</Button>
        <Button onClick={clearFilters}>Clear filters</Button>
        <Button onClick={clearAll}>Clear filters and sorters</Button>
      </Space>
      <Table columns={columns} dataSource={data} onChange={handleChange} />
    </>
  );
};


export default App;
