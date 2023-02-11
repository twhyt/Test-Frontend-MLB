import { useEffect, useState } from 'react';
import './App.css';
import MockData from './MOCK_DATA.json'
import { Button, Card, Col, Input, Row, Spin } from 'antd';

function App() {

  const [gender, setGender]: any = useState([])
  const [country, setCountry]: any = useState([])
  const [Data, setData]: any = useState([])
  const [data_country, setData_country]: any = useState('')
  const [data_gender, setData_gender]: any = useState('')
  const [data_text, setData_text]: any = useState('')

  useEffect(() => {
    setData(MockData)
    let arr_gender:any = []
    let arr_country:any = []
    MockData.map((item: any, key:number) => {
      if (!arr_gender.includes(item?.gender)) {
        arr_gender=[...arr_gender, item?.gender]
      }
      if (!arr_country.includes(item?.country)) {
        arr_country=[...arr_country, item?.country]
      }
    })
    setCountry(arr_country)
    setGender(arr_gender)
  }, [])

  const FilterSearch = (e: any) => {
    setData_country('')
    setData_gender('')
    setData_text(e.target.value)
    let arr: any = []

    arr = MockData.filter((fil_data: any) => {
      let firtname_low = String(fil_data?.first_name).toLowerCase()
      let lastname_low = String(fil_data?.last_name).toLowerCase()
      return fil_data?.first_name.includes(e.target.value) || fil_data?.last_name.includes(e.target.value) || firtname_low.includes(e.target.value) || lastname_low.includes(e.target.value)
    })
    setData(arr)
  }

  const FilterChioce = (data: any, key: string) => {
    let arr: any = []
    if (key === 'gender') {
      setData_gender(data)
      if (data_country === '') {
        arr = MockData.filter((fil_data: any) => {
          return fil_data?.gender === data
        })
      } else {
        arr = MockData.filter((fil_data: any) => {
          return fil_data?.gender === data && fil_data?.country === data_country
        })
      }
    }
    if (key === 'country') {
      setData_country(data)
      if (data_gender === '') {
        arr = MockData.filter((fil_data: any) => {
          return fil_data?.country === data
        })
      } else {
        arr = MockData.filter((fil_data: any) => {
          return fil_data?.gender === data_gender && fil_data?.country === data
        })
      }
    }
    setData(arr)
  }

  const Reset = () => {
    setData_country('')
    setData_gender('')
    setData_text('')
    setData(MockData)
  }

  return (
    <div className="App">

      <Row className='w-100' justify={'center'}>
        <h1>Test Exam : Kittinan Pokai (TOYOTA)</h1>
      </Row>

      {/* Choose Your Choice */}
      <div className='choice-row'>
        <Row align={'middle'}>
          <Col className='head-choice'>Gender :</Col>
          <Col>
            <Row>
              {gender.map((item: any, key: any) => {
                return (
                  <Button key={key} className={`choice-btn ${data_gender === item ? 'active' : ''}`} onClick={() => { FilterChioce(item, 'gender') }}>
                    {item}
                  </Button>
                )
              })}
            </Row>
          </Col>
        </Row>
      </div>
      <div className='choice-row'>
        <Row align={'middle'}>
          <Col className='head-choice'>Country :</Col>
          <Col>
            <Row>
              {country.map((item: any, key: any) => {
                return (
                  <Button key={key} className={`choice-btn ${data_country === item ? 'active' : ''}`} onClick={() => { FilterChioce(item, 'country') }}>
                    {item}
                  </Button>
                )
              })}
            </Row>
          </Col>
        </Row>
      </div>

      <div className='box-card'>
        <Row style={{ marginBottom: '3vw' }} justify={'center'} align='middle'>
          <Input style={{ maxWidth: '20vw' }} placeholder="Search" onChange={(e: any) => FilterSearch(e)} value={data_text} />
          <span style={{ color: 'red', marginLeft: 10, cursor: 'pointer' }} onClick={() => Reset()}>Clear</span>
        </Row>
        <Row gutter={[16, 16]}>
          {
            Data.map((item: any, key: any) => {
              return (
                <Col key={key} xs={8}>
                  <Card
                    hoverable
                    cover={<img className='image' alt={'test'} src={item.image} />}
                  >
                    <Row style={{ color: 'gray' }} className='row-data' justify={'center'}>
                      <span>{item.first_name} {item.last_name}</span>
                    </Row>
                    <Row className='row-data' justify={'center'}>
                      <span>{item.gender}</span>
                    </Row>
                    <Row className='row-data' justify={'center'}>
                      <span>{item.email}</span>
                    </Row><Row className='row-data' justify={'center'}>
                      <span>{item.country}</span>
                    </Row>
                  </Card>
                </Col>
              )
            })
          }
        </Row>
      </div>
    </div>
  );
}

export default App;
