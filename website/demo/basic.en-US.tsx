import dayjs from 'dayjs'
import RcGantt, { enUS } from 'rc-gantt'
import React, { useState } from 'react'

interface Data {
  id: number
  name: string
  startDate: string
  endDate: string
  className: string
  barItems?: {
    id: string
    icon: JSX.Element
    startDate: string
    endDate: string
  }[]
  children: any
}

function createData(len: number) {
  const result: Data[] = []
  for (let i = 0; i < len; i++) {
    result.push({
      id: i,
      name: `Title${i}`,
      startDate: dayjs().subtract(-i, 'day').format('YYYY-MM-DD'),
      endDate: dayjs().add(i, 'day').format('YYYY-MM-DD'),
      className: 'blue',
      children: [
        {
          id: i,
          name: `Title${i}`,
          startDate: dayjs().subtract(-i, 'day').format('YYYY-MM-DD'),
          endDate: dayjs().add(i, 'day').format('YYYY-MM-DD'),
          className: 'gray',
          children: [
            {
              id: i,
              name: `Title${i}`,
              startDate: dayjs().subtract(-i, 'day').format('YYYY-MM-DD'),
              endDate: dayjs().add(i, 'day').format('YYYY-MM-DD'),
              className: 'white',
              barItems: [
                {
                  id: `${i}-1`,
                  icon: <span>A</span>,
                  startDate: dayjs().subtract(-i, 'week').format('YYYY-MM-DD'),
                  endDate: dayjs().add(i, 'week').format('YYYY-MM-DD'),
                },
                {
                  id: `${i}-2`,
                  icon: <span>B</span>,
                  startDate: dayjs()
                    .subtract(-i - 1, 'week')
                    .format('YYYY-MM-DD'),
                  endDate: dayjs()
                    .add(i + 1, 'week')
                    .format('YYYY-MM-DD'),
                },
                {
                  id: `${i}-3`,
                  icon: <span>C</span>,
                  startDate: dayjs()
                    .subtract(-i - 3, 'week')
                    .format('YYYY-MM-DD'),
                  endDate: dayjs()
                    .add(i + 3, 'week')
                    .format('YYYY-MM-DD'),
                },
              ],
            },
          ],
        },
      ],
    })
  }
  return result
}

const App = () => {
  const [data, setData] = useState(createData(10))
  console.log('data', data)
  const handleClick = (e) => {
    console.log(e, e.currentTarget.value, e.currentTarget.innerText)
  }
  return (
    <div style={{ width: '100%', height: 500 }}>
      <RcGantt<Data>
        data={data}
        columns={[
          {
            name: 'name',
            label: 'Custom Title',
            width: 52,
          },
          {
            name: 'name',
            label: 'Custom Title',
          },
          {
            name: 'name',
            label: 'Custom Title',
            width: 40,
          },
          {
            name: 'name',
            label: 'Custom Title',
            width: 55,
          },
          {
            name: 'name',
            label: 'Custom Title',
            width: 100,
          },
          {
            name: 'name',
            label: 'Custom Title',
            width: 85,
          },
        ]}
        // onExpand={}
        unit='week_in_month'
        showUnitSwitch={false}
        locale={enUS}
        onUpdate={async (row, startDate, endDate) => {
          console.log('update', row, startDate, endDate)
          setData(prev => {
            const newList = [...prev]
            const index = newList.findIndex(val => val.id === row.id)
            newList[index] = {
              ...row,
              startDate: dayjs(startDate).format('YYYY-MM-DD'),
              endDate: dayjs(endDate).format('YYYY-MM-DD'),
            }
            return newList
          })
          return true
        }}
        onTimeAxisClick={handleClick}
        renderDaysText={() => ''}
        showChangeBarSize={false}
        canMoveBar={false}
        timeAxisMinorStyle={{ color: '#006ec8' }}
        tableSize={{
          minWidth: 684,
          maxWidth: 1080,
        }}
      />
    </div>
  )
}

export default App
