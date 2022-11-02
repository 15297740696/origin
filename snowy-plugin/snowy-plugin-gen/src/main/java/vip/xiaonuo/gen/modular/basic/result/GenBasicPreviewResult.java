/*
 * Copyright [2022] [https://www.xiaonuo.vip]
 *
 * Snowy采用APACHE LICENSE 2.0开源协议，您在使用过程中，需要注意以下几点：
 *
 * 1.请不要删除和修改根目录下的LICENSE文件。
 * 2.请不要删除和修改Snowy源码头部的版权声明。
 * 3.本项目代码可免费商业使用，商业使用请保留源码和相关描述文件的项目出处，作者声明等。
 * 4.分发源码时候，请注明软件出处 https://www.xiaonuo.vip
 * 5.不可二次分发开源参与同类竞品，如有想法可联系团队xiaonuobase@qq.com商议合作。
 * 6.若您的项目无法满足以上几点，需要更多功能代码，获取Snowy商业授权许可，请在官网购买授权，地址为 https://www.xiaonuo.vip
 */
package vip.xiaonuo.gen.modular.basic.result;

import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

/**
 * 预览代码生成结果
 *
 * @author xuyuxiang
 * @date 2022/10/28 17:03
 **/
@Getter
@Setter
public class GenBasicPreviewResult {

    /** SQL代码结果集 */
    @ApiModelProperty(value = "SQL代码结果集", position = 1)
    private List<GenBasicCodeResult> genBasicCodeSqlResultList;

    /** 前端代码结果集 */
    @ApiModelProperty(value = "前端代码结果集", position = 2)
    private List<GenBasicCodeResult> genBasicCodeFrontendResultList;

    /** 后端代码结果集 */
    @ApiModelProperty(value = "后端代码结果集", position = 3)
    private List<GenBasicCodeResult> genBasicCodeBackendResultList;

    @Getter
    @Setter
    public static class GenBasicCodeResult {

        /** 代码文件名称 */
        @ApiModelProperty(value = "代码文件名称", position = 1)
        private String codeFileName;

        /** 代码文件带路径名称 */
        @ApiModelProperty(value = "代码文件带路径名称", position = 2)
        private String codeFileWithPathName;

        /** 代码文件内容 */
        @ApiModelProperty(value = "代码文件内容", position = 2)
        private String codeFileContent;
    }
}
