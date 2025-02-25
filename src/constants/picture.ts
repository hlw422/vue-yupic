/**
 * 图片审核枚举
 */
export const PIC_REVIEW_STATUS_ENUM = {  
    REVIEWING: 0,  
    PASS: 1,  
    REJECT: 2,  
  }  
    
// 定义一个类型接口，用于描述 PIC_REVIEW_STATUS_MAP 对象的结构
interface PicReviewStatusMap {
    [key: number]: string;
}

// 定义 PIC_REVIEW_STATUS_MAP 常量，并指定其类型为 PicReviewStatusMap
export const PIC_REVIEW_STATUS_MAP: PicReviewStatusMap = {
    0: '待审核',
    1: '通过',
    2: '拒绝',
};
    
  export const PIC_REVIEW_STATUS_OPTIONS = Object.keys(PIC_REVIEW_STATUS_MAP).map((key:any) => {  
    return {  
      label: PIC_REVIEW_STATUS_MAP[key],  
      value: key,  
    }  
  })
  