#!/usr/bin/nodejs

const fs = require('fs')
function readFile(file) {
  return new Promise(function(resolve,reject) {
    fs.readFile(file,function(err,data) {
      if(err) {
        reject(err)
      }else{
        resolve(data.toString())
      }

    })

  })
}
(async function() {
  const text1 = await readFile('./zipcode.txt')
  const arr = text1.split(/[\s\r\n]+/)
  const zipList = []
  for(let i = 0 ;i < arr.length;i = i + 3) {
    if(arr[i + 1] == '-') {
      zipList.push({
        name:arr[i],
        list:[]
      })
    }else{
      zipList[zipList.length - 1].list.push({
        name:arr[i],
        areacode:arr[i + 1],
        zipcode:arr[i + 2].length > 6 ? arr[i + 2].substring(arr[i + 2].length - 6) : arr[i + 2]
      })
    }
  }
  const text2 = await readFile('./data.json')
  const data = JSON.parse(text2)
  for(let i = 0 ;i < data.length;i++) {
    const provice = data[i].name
    const { list } = zipList.find(m => m.name == provice)
    for(let j = 0;j < list.length;j++) {
      const item = list[j]

      if(data[i].name.indexOf(item.name) > -1) {
        data[i].zipcode = item.zipcode
        data[i].areacode = item.areacode
        continue
      }
      let temp = data[i].children.find(m => m.name.indexOf(item.name) > -1)
      if(temp != null) {
        temp.zipcode = item.zipcode
        temp.areacode = item.areacode
        continue
      }
      let flag = false
      for(let k = 0;k < data[i].children.length;k++) {
        const a = data[i].children[k]
        for(let l = 0;l < a.children.length;l++) {
          const b = a.children[l]
          if(b.name.indexOf(item.name) > -1) {
            b.zipcode = item.zipcode
            b.areacode = item.areacode
            flag = true
            break
          }
        }
        if(flag) {
          break
        }
      }

    }

  }
  for(let i = 0 ;i < data.length;i++) {
    const provice = data[i]
    for(let j = 0;j < provice.children.length;j++) {
      const city = provice.children[j]
      if(!city.zipcode) {
        city.zipcode = provice.zipcode
      }
      if(!city.areacode) {
        city.areacode = provice.areacode

      }
    }

  }
  fs.writeFile('./data2.json',JSON.stringify(data),function() {
    return
  })
})()


console.info('end')