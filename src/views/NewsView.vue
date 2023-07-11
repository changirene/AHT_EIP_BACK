<template>
    <aside-bar/>
    <div class="wrapper">
      <header>
        <h2>最新公告管理</h2>
        <div class="logout">
          <router-link to="/"><button>登出</button></router-link> 
        </div>
      </header>
      <!-- 新增按鈕 -->
      <Button type="primary" class="add" @click="modal = true">新增 +</Button>
      <Modal
            v-model="modal"
            title="新增最新消息"
            ok-text="確認新增"
            cancel-text="取消"
            @on-cancel="cancelbtn"
            >
            
        <Form v-model="addList" :label-width="80">
          <FormItem label="編號">
            <text>{{ addList.news_id }}</text>
          </FormItem>
          <FormItem label="上架日期">
            <DatePicker type="date" v-model="addList.news_add_date" placeholder="請選擇日期" style="width: 200px" />
          </FormItem>

          <FormItem label="標題" >
            <Input placeholder="請輸入標題" v-model="addList.news_title"></Input>
          </FormItem>
              
          <FormItem label="內容" >
            <Input type="textarea" v-model="addList.news_content" :autosize="{minRows: 5}" placeholder="請輸入消息內容"></Input>
          </FormItem>
          <FormItem label="狀態" >
            <i-switch size="large" v-model="addList.news_status">
                <template #open>
                  <span>上架</span>
                </template>
                <template #close>
                  <span>下架</span>
                </template>
            </i-switch>
            </FormItem>
        </Form>
      </Modal>

      <Table class="custom-table" stripe :columns="columns" :data="list" height="420px">
        <template #news_id="{ row }">
            <p>{{ row.news_id }}</p>
        </template>
        
        <template #news_status="{ row }">
            <Switch 
            size="large" 
            :value="row.news_status" 
            true-color="#057DCD" 
            :before-change="handleBeforeChange" 
            >
                <template #open>
                  <span>上架</span>
                </template>
                <template #close>
                  <span>下架</span>
                </template>
            </Switch>
        </template>
        <template #edit="{row}">
          <Button type="primary" @click="clickEditBtn(row.news_id)">編輯</Button>
          <Modal
            v-model="modal3[row.news_id]"
            title="編輯最新消息"
            ok-text="確認修改"
            cancel-text="取消"
            @on-ok="onOK"
            >
            
        <Form v-model="list" :label-width="80">
          <FormItem label="編號">
            <text>{{ row.news_id }}</text>
          </FormItem>
          <FormItem label="上架日期">
            <!-- <DatePicker type="date" v-model="row.news_add_date" placeholder="請選擇日期" style="width: 200px" /> -->
            <DatePicker type="date" placeholder="請選擇日期" style="width: 200px" />
          </FormItem>

          <FormItem label="標題" >
            <Input v-model="row.news_title" placeholder="請輸入標題"></Input>
          </FormItem>
              
          <FormItem label="內容" >
            <Input v-model="row.news_content" type="textarea" :autosize="{minRows: 5}" placeholder="請輸入消息內容"></Input>
          </FormItem>
          <FormItem label="狀態" >
            <i-switch size="large" v-model="row.news_status">
                <template #open>
                  <span>上架</span>
                </template>
                <template #close>
                  <span>下架</span>
                </template>
            </i-switch>
            </FormItem>
        </Form>
      </Modal>

        </template>
    </Table>
    <div class="news-pagination">
        <span
          v-if="page != 1"
          class="pages__button_prev"
          @click="setPage(page - 1)"
        >
          &lt;
        </span>
        <span
          v-for="p in pages"
          :key="p.id"
          @click="setPage(p)"
          :class="{ pages__button: true, 'pages__button--active': p == page }"
        >
          {{ p }}
        </span>
        <span
          v-if="page != pages.length"
          class="pages__button_next"
          @click="setPage(page + 1)"
        >
          &gt;
        </span>
      </div>
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
              modal: false,
              modal1: false,  //新增彈窗預設關閉
              modal3: [],
              news_status:true,
              switchStatus:true,
              formItem: {
                    input: '',
                    switch: true,
                    textarea: ''
                },
              page: 0, //當前頁碼
              pages: [], //總共頁數
              perPage: 8, //每頁多少項目
              list: [], //當前顯示項目
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
                      // width: 650,
                  },
                  {
                      title: '狀態',
                      slot: 'news_status',
                      align: 'center',
                      width: 120,
                  },
                  {
                      title: '編輯',
                      slot: 'edit',
                      align: 'center',
                      width: 120,
                  }
              ],
              newsList: [
                  {
                      news_id: 1,
                      news_add_date: '2023.06.30',
                      news_title: '人事異動通知',
                      news_status: 1,
                      newa_content:'人事異動通知人事異動通知人事異動通知',
                  },
                  {
                      news_id: 2,
                      news_add_date: '2023.06.29',
                      news_title: '人事異動通知',
                      news_status: 1,
                      newa_content:'人事異動通知人事異動通知人事異動通知'
                  },
                  {
                      news_id: 3,
                      news_add_date: '2023.06.28',
                      news_title: '人事異動通知',
                      news_status: 1,
                      newa_content:'人事異動通知人事異動通知人事異動通知'
                  },
                  {
                      news_id: 4,
                      news_add_date: '2023.06.27',
                      news_title: '人事異動通知',
                      news_status: 1,
                      newa_content:'人事異動通知人事異動通知人事異動通知'
                  },
                  {
                      news_id: 5,
                      news_add_date: '2023.06.26',
                      news_title: '人事異動通知',
                      news_status: 1,
                      newa_content:'人事異動通知人事異動通知人事異動通知'
                  },
                  {
                      news_id: 6,
                      news_add_date: '2023.06.25',
                      news_title: '人事異動通知',
                      news_status: 1,
                      newa_content:'人事異動通知人事異動通知人事異動通知'
                  },
                  {
                      news_id: 7,
                      news_add_date: '2023.06.24',
                      news_title: '人事異動通知',
                      news_status: 1,
                      newa_content:'人事異動通知人事異動通知人事異動通知'
                  },
                  {
                      news_id: 8,
                      news_add_date: '2023.06.23',
                      news_title: '人事異動通知',
                      news_status: 1,
                      newa_content:'人事異動通知人事異動通知人事異動通知'
                  },
                  {
                      news_id: 9,
                      news_add_date: '2023.06.22',
                      news_title: '人事異動通知',
                      news_status: 1,
                      newa_content:'人事異動通知人事異動通知人事異動通知'
                  },
                  {
                      news_id: 10,
                      news_add_date: '2023.06.21',
                      news_title: '人事異動通知',
                      news_status: 1,
                      newa_content:'人事異動通知人事異動通知人事異動通知'
                  },
                  {
                      news_id: 11,
                      news_add_date: '2023.06.20',
                      news_title: '人事異動通知',
                      news_status: 1,
                      newa_content:'人事異動通知人事異動通知人事異動通知'
                  },
                  {
                      news_id: 12,
                      news_add_date: '2023.06.19',
                      news_title: '人事異動通知',
                      news_status: 1,
                      newa_content:'人事異動通知人事異動通知人事異動通知'
                  }
              ],
              addList: {
                news_id: '',
                news_add_date: '',
                news_title: '',
                news_status: '',
                newa_content: '',
              },
              resetList: {
                news_id: '',
                news_add_date: '',
                news_title: '',
                news_status: '',
                newa_content: '',
              },
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
      clickEditBtn(id) {
        const item = this.newsList.find(item => item.news_id === id);
        if (item) {
          this.modal3[id] = true;
        }
      },
      onOK(){
        const news_add_date = new Date();
        news_add_date.toLocaleDateString();
        this.$Message.info('編輯成功');
      },
      cancelbtn(){
        this.addList = {...this.resetList};
      },
      setPage(p) {
        if (p != this.page) {
          this.page = p;
          let minI = this.perPage * this.page - this.perPage;
          let maxI = this.perPage * this.page;
          this.list.length = 0;
          for (let i = minI; i < maxI && i < this.newsList.length; i++) {
            this.list.push(this.newsList[i]);
            }
          }
      },
    },
    mounted() {
      let pagesAmount = Math.ceil(this.newsList.length / this.perPage);
      for (let i = 1; i <= pagesAmount; i++) {
        this.pages.push(i);
      }
      this.setPage(1);
    },
  }
  </script>
  <style lang="scss" scoped>
  
  .wrapper{
    width: 80%;
    margin: 0 20px 0 270px;
    padding-top: 10px;
    background-color: #ffffff00;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
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
    .add{
          width: 80px;
          font-size: 16px;
          margin-top: 20px;
    }
    .custom-table{
      margin: 30px 10px;
      
    }
    .news-pagination {
      display: flex;
      justify-content: center;
      margin: 5px;
      .pages__button, .pages__button_prev, .pages__button_next {
        cursor: pointer;
        font-size: 14px;
        background-color: #fff;
        border: 1px solid #d2d2d2;
        color: #747474;
        padding: 9px 12px;
        margin: 5px;
        border-radius: 5px;
      }

      .pages__button:hover, .pages__button--active {
        border: 1px solid #057DCD;
        color: #057DCD;
      }
    }
  }
  
  </style>
  