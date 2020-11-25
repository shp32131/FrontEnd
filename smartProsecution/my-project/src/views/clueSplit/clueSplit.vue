<template>
  <!-- class = clue-split-page -->
  <div class="clueSplit-page"> 
    <!-- 页面标题 page-head -->
    <div class="clueHeader">
      <div class="clueSplit-title">线索拆分</div>
      <div>
       <el-button type="primary" size="small" @click="addClue" :disabled="caseBySplitClue.length > 1 ? false : true">
         添加线索
       </el-button>
      </div>
    </div>

    <!-- 原线索信息 native-clue-info -->
    <div class="clueSplit-content">
      <!-- 原线索标题 clue-title -->
      <div class="clueSplit-header">
        <span class="number-icon-wrapper">
          <span class="number-icon">1</span>
        </span>
        <span class="clueSplit-header-title">待拆分线索基本信息</span>
      </div>

      <!-- 原线索基本信息 clue-info -->
      <div class="clueSplit-info-wrapper">
        <div class="clueSplit-info-header">
          <span class="title">线索名称：</span>
          <span class="content">{{pageData.clueName}}</span>
        </div>
        <div class="clueSplit-text">
          <span class="title">线索介绍：</span>
          <span class="content">{{pageData.clueDes}}</span>
        </div>
      </div>

      <!-- 原线索关联案源 clue-cases -->
      <div class="clueSplit-table-wrapper">
        <div class="clueSplit-table-header">
          <span>待拆分线索关联案源</span>
        </div>
        <div class="clueSplit-table-content">
          <el-table :data="caseBySplitClue" height="390px">
            <el-table-column type="index" label="序号" fixed></el-table-column>
            <el-table-column label="预警等级" fixed prop="warningLevel">
              <template slot-scope="scope">
                <el-rate v-model="scope.row.warningLevel" disabled></el-rate>
              </template>
            </el-table-column>
            <!-- <el-table-column label="案源名称" fixed prop="caseName" show-overflow-tooltip></el-table-column> -->
            <el-table-column label="案源名称" fixed prop="caseName" show-overflow-tooltip></el-table-column>
            <el-table-column label="案由" fixed prop="caseSource" show-overflow-tooltip></el-table-column>
            <el-table-column label="案由来源" fixed prop="caseField" show-overflow-tooltip></el-table-column>
          </el-table>
        </div>
      </div>
    </div>

    <!-- 新线索信息 new-clue-info -->
    <div class="newClue-info" v-for="(item,index) in clueForm.formList" :key="index+'_size'">
      <!-- clue-title -->
      <div class="newClue-info-header">
        <div class="clue-title">
          <span class="number-icon-wrapper">
            <span class="number-icon">{{ index + 2 }}</span>
          </span>
          <span class="">新线索基本信息</span>
        </div>
        <div class="newClue-del-btn">
          <el-button size="mini" @click="deleteNewClue(item,index)" v-if="index > 0 ? true : false">删&nbsp;除</el-button>
        </div>
      </div>
      <!-- 新线索表单 clue-form -->
      <div class="newClue-form-wrapper">
        <el-form :model="clueForm" ref="clueForm" :rules="rules" label-width="80px">
          <el-form-item label="线索名称" :prop="'formList.'+index+.'clueName'" :rules="clueNameRules.clueName">
            <el-input v-model="item.clueName" placeholder="请输入" maxlength="50" size="medium"></el-input>
          </el-form-item>
          <el-form-item label="线索介绍" prop="clueDes" class="textarea">
            <el-input v-model="item.clueDes" placeholder="请输入" maxlength="400" size="medium" show-word-limit></el-input>
          </el-form-item>
          <!-- 新线索关联案源 clue-cases -->
          <div class="newClue-link-case">
            <span class="clue-title">新线索关联案源</span>
            <el-button type="primary" size="small" @click="addNewClueCases(index)" :disabled="caseBySplitClue.length > 1 ? false : true">添加案源</el-button>
          </div>
          <el-form-item>
            <div class="newClue-table-wrapper">
              <el-table :data="item.newClueCases" height="350px" v-fi="item.newClueCases.length !== 0">
                <el-table-column type="index" label="序号"> </el-table-column>
                <el-table-column label="案源名称" prop="caseName" show-overflow-tooltip></el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button type="text" @click="deleteNewClueCase(scope.row,index)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-form-item>
        </el-form>
      </div>   
    </div>
    <!-- 页面底部button -->
    <div class="footer-button">
      <el-button size="small" @click="$router.go(-1)">返回</el-button>
      <el-button size="small" @click="submit()" type="primary" :disabled="caseBySplitClue.length > 0 ? false:true">提交</el-button>
    </div>

    <!-- 添加案源的弹窗页面 -->
    <el-dialog :visible.sync="selectCaseVisible" width="646px" :before-close="close" title="添加案源" :modal-append-to-body="false" :apppend-to-body="true">
      <el-table :data="selectList" ref="dialogTabel" style="width:646px;height:543px" :max-height="height" @selection-change="handleSelection">
       <el-table-column type="selection" width="50"></el-table-column> 
       <el-table-column type="index" label="序号" width="50"></el-table-column>
       <el-table-column label="预警等级" prop="warningLevel" show-overflow-tooltip>
         <template slot-scope="scope">
           <el-rate v-model="scope.row.warningLevel" disabled></el-rate>
         </template>
       </el-table-column>
       <el-table-column label="案源名称" prop="caseName" show-overflow-tooltip></el-table-column>
       <el-table-column label="案由" prop="caseSource" show-overflow-tooltip></el-table-column>
       <el-table-column label="案源来源" prop="caseField" show-overflow-tooltip></el-table-column>
      </el-table>
      <!-- 底部按钮 -->
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="selectCaseVisible=false">取消</el-button>
        <el-button size="small" @click="confirm" type="primary">确定</el-button>
      </div>
    </el-dialog> 

  </div>
</template>
<script>
// listCaseByClueId 获取原线索关联案源
// splitClue 提交拆分的新线索数据
import {listCaseByClueId,splitClue} from "@/views/pilas/api/clue.js";
export default {
  data: function(){
    return {
      // 页面自带数据
      pageData: {},
      seletIndex: 0,
      selectCaseVisible: false,
      caseBySplitClue: [],
      // ?
      height: window.innerHeight-500,
      //
      clueForm: {
        formList: [
          {
            clueName: " ",
            clueDes: " ",
            newClueCases: []
          }
        ]
      },
      //
      selectList: [],
      //
      checkList: [],
      // 
      clueNameRules: {
        clueName: [
          {
            required: true,
            message: "请输入线索名称",
            trigger: "blur"
          }
        ]
      }
    }
  },
  methods: {
    //
    addClue() {
      this.clueForm.formList.push({
        clueName: "",
        clueDes: "",
        newClueCases: []
      })
    },
    //

  }
}

</script>