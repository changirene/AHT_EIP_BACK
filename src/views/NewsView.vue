<template>
    <aside-bar/>
    <div class="wrapper">
      <header>
        <h2>最新公告管理</h2>
        <div class="logout">
          <button>登出</button>
        </div>
      </header>
      <Table class="custom-table" stripe :columns="columns" :data="data">
        <template #news_id="{ row }">
            <p>{{ row.news_id }}</p>
        </template>
        
        <template #news_status="{ row }">
            <Switch size="large"  true-color="#057DCD" :before-change="handleBeforeChange">
                <template #open>
                  <span>上架</span>
                </template>
                <template #close>
                  <span>下架</span>
                </template>
            </Switch>
        </template>
        <template #edit="{index}">
          <Button type="primary" @click="clickEditBtn(index)">編輯</Button>
          <Modal
            v-model="modal3[index]"
            title="編輯最新消息"
            ok-text="確認修改"
            cancel-text="取消">
            
              <Form :model="formItem" :label-width="80">
              <FormItem label="Input">
              <Input v-model="formItem.input" placeholder="Enter something..."></Input>
              </FormItem>
              

             <FormItem label="Switch">
              <i-switch v-model="formItem.switch" size="large">
                  <template #open>
                    <span>On</span>
                  </template>
                  <template #close>
                    <span>Off</span>
                  </template>
              </i-switch>
          </FormItem>
          <FormItem label="Text">
              <Input v-model="formItem.textarea" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
          </FormItem>
          
      </Form>
        </Modal>
        </template>
    </Table>
    <Page :total="100" :page-size="9" />
    </div>
  </template>
  
  <script>
  
  import AsideBar from '@/components/AsideBar.vue'
  
  export default {
    name: 'NewsView',
    components: {
      AsideBar,
    },
    data () {
            return {
              value:true,
              modal1: false,  //新增彈窗預設關閉
              modal3: [],
              formItem: {
                    input: '',
                    switch: true,
                    textarea: ''
                },
              columns: [
                  {
                      title: '編號',
                      slot: 'news_id',
                      align: 'center',
                      sortable: true, //是否排序
                      width: 100,
                  },
                  {
                      title: '上架日期',
                      key: 'news_add_date',
                      align: 'center',
                      sortable: true, //是否排序
                      width: 200,
                  },
                  {
                      title: '標題',
                      key: 'news_title',
                      width: 650,
                  },
                  {
                      title: '狀態',
                      slot: 'news_status',
                      align: 'center'
                  },
                  {
                      title: '編輯',
                      slot: 'edit',
                      align: 'center'
                  }
              ],
              data: [
                  {
                      news_id: 1,
                      news_add_date: '2023.06.23',
                      news_title: '人事異動通知',
                      news_status: 1,
                  },
                  {
                      news_id: 2,
                      news_add_date: '2023.06.23',
                      news_title: '人事異動通知',
                      news_status: 1,
                  },
                  {
                      news_id: 3,
                      news_add_date: '2023.06.23',
                      news_title: '人事異動通知',
                      news_status: 1,
                  },
                  {
                      news_id: 4,
                      news_add_date: '2023.06.23',
                      news_title: '人事異動通知',
                      news_status: 1,
                  },
                  {
                      news_id: 5,
                      news_add_date: '2023.06.23',
                      news_title: '人事異動通知',
                      news_status: 1,
                  },
                  {
                      news_id: 6,
                      news_add_date: '2023.06.23',
                      news_title: '人事異動通知',
                      news_status: 1,
                  },
                  {
                      news_id: 7,
                      news_add_date: '2023.06.23',
                      news_title: '人事異動通知',
                      news_status: 1,
                  },
                  {
                      news_id: 8,
                      news_add_date: '2023.06.23',
                      news_title: '人事異動通知',
                      news_status: 1,
                  },
                  {
                      news_id: 9,
                      news_add_date: '2023.06.23',
                      news_title: '人事異動通知',
                      news_status: 1,
                  }
              ]
            }
        },
    methods: {
      handleBeforeChange () {
                return new Promise((resolve) => {
                    this.$Modal.confirm({
                        title: '更改狀態',
                        content: '確認更改當前狀態?',
                        onOk: () => {
                            resolve();
                        }
                    });
                });
              },
              clickEditBtn(index) {
              this.modal3[index] = true;
              },
              
    }
  }
  </script>
  <style lang="scss" scoped>
  .wrapper{
    width: 80%;
    margin: 0 20px 0 270px;
    padding-top: 10px;
    background-color: #ffffff00;
    header{
      display: flex;
      justify-content: space-between;
      h2{
        font-size: 45px;
        font-weight: bolder;
        padding: 5px 10px;
        margin: 10px 15px;
        border-bottom: 3px solid #057DCD;
        -webkit-text-stroke: 0.5px #057DCD;
      }
      .logout{
        button{
          font-size: 17px;
          font-weight: bold;
          background-color: #d5ecf7;
          padding: 8px 20px;
          margin: 10px 20px;
          border-radius: 20px;
          color: #057DCD;
          cursor: pointer;
        }
      }
    }
    .custom-table{
      margin: 30px 10px;
      
    }
  }
 
  
  </style>
  