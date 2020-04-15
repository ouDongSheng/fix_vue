<template>
  <div class="aboutUs">
    <div>
      <div class="title">关于我们</div>
      <div>
       <p>专业家电清洗中心成立多年以来，始终坚持精益求精，所以绵延久远。经过长时间地积极探索、开拓创新，目前已俨然成为一家集优服务、高标准为一体的精细化、流程化的家电清洗公司。<p>
       <P>企业围绕实施“管理科学化，服务规范化、收费合理化”战略。</P>
       <p>管理科学化：我们在维修店铺模式的基础上不断更新，采取信息系统与呼叫中心坐席、 清洗师傅手机、电脑形成信息互联互动，绩效管理，自动结算，网上银行，统计，通知，培训，考试等。</p>
       <p>服务规范化：维修师傅入职前通过严格专业技术把关，还要进行文化制度培训、考核后上岗，不仅服装、证照、工具箱(袋)、单据等，而且作业流程、服务规范、收费标准等行为规范。</p>
       <p>收费合理化：在科学的管理下，有专门的材料库，信息网络化使公司更加有优势，明码实价，拒绝乱收费现象。</p>
      </div>

    </div>
    
  </div>
</template>

<script>
export default {
  name: 'aboutUs',
  data(){
    return{

    }
  },
  created() {},
  activated() {

  },
  methods: {
    onKnow() {
      // 我知道了
    }
  }
}
</script>
<style scoped>
.title{
  text-align: center;
  font-weight: 500;
  font-size: 1rem;
}
.aboutUs{
  height: 100%;
  background: #fff;
}
.aboutUs>div{
  padding: .75rem;
}
.btn{
  padding: 3rem;
}
</style>
