/**
 *  Copyright [2022] [https://www.xiaonuo.vip]
 *	Snowy采用APACHE LICENSE 2.0开源协议，您在使用过程中，需要注意以下几点：
 *	1.请不要删除和修改根目录下的LICENSE文件。
 *	2.请不要删除和修改Snowy源码头部的版权声明。
 *	3.本项目代码可免费商业使用，商业使用请保留源码和相关描述文件的项目出处，作者声明等。
 *	4.分发源码时候，请注明软件出处 https://www.xiaonuo.vip
 *	5.不可二次分发开源参与同类竞品，如有想法可联系团队xiaonuobase@qq.com商议合作。
 *	6.若您的项目无法满足以上几点，需要更多功能代码，获取Snowy商业授权许可，请在官网购买授权，地址为 https://www.xiaonuo.vip
 */
/*
 * @Descripttion: 工具集
 * @version: 1.1
 * @LastEditors: yubaoshan
 * @LastEditTime: 2022年4月19日10:58:41
 */

const tool = {}

/**
 * localStorage
 *
 * @author yubaoshan
 * @date 2022-05-18 22:59
 */
tool.data = {
	set(table, settings) {
		const _set = JSON.stringify(settings)
		return localStorage.setItem(table, _set)
	},
	get(table) {
		let data = localStorage.getItem(table)
		try {
			data = JSON.parse(data)
		} catch (err) {
			return null
		}
		return data
	},
	remove(table) {
		return localStorage.removeItem(table)
	},

	clear() {
		return localStorage.clear()
	}
}

/**
 * sessionStorage
 *
 * @author yubaoshan
 * @date 2022-05-18 22:59
 */
tool.session = {
	set(table, settings) {
		const _set = JSON.stringify(settings)
		return sessionStorage.setItem(table, _set)
	},
	get(table) {
		let data = sessionStorage.getItem(table)
		try {
			data = JSON.parse(data)
		} catch (err) {
			return null
		}
		return data
	},
	remove(table) {
		return sessionStorage.removeItem(table)
	},
	clear() {
		return sessionStorage.clear()
	}
}

/**
 * 千分符
 *
 * @author yubaoshan
 * @date 2022-05-18 22:59
 */
tool.groupSeparator = (num) => {
	num = `${num}`
	if (!num.includes('.')) num += '.'

	return num
		.replace(/(\d)(?=(\d{3})+\.)/g, ($0, $1) => {
			return `${$1},`
		})
		.replace(/\.$/, '')
}

/**
 * 获取所有字典数组
 *
 * @author yubaoshan
 * @date 2022-04-08 01:11
 */
tool.dictDataAll = () => {
	return tool.data.get('DICT_TYPE_TREE_DATA')
}

/**
 * 字典翻译方法
 * 界面插槽使用方法 {{ $TOOL.dictType('sex', record.sex) }}
 *
 * @author yubaoshan
 * @date 2022-04-08 01:11
 */
// todo 每次都从localStorage获取并重新解析，会有性能问题，应该在内存中做一层缓存，后面需要优化掉
tool.dictTypeData = (dictValue, value) => {
	const dictTypeTree = tool.dictDataAll()
	if (!dictTypeTree) {
		return '需重新登录'
	}
	const tree = dictTypeTree.find((item) => item.dictValue === dictValue)
	if (!tree) {
		return '无此字典'
	}
	const children = tree.children
	const dict = children.find((item) => item.dictValue === value)
	return dict?.name || '无此字典'
}

/**
 * 获取某个code下字典的列表，多用于字典下拉框
 *
 * @author yubaoshan
 * @date 2022-04-08 01:11
 */
tool.dictTypeList = (dictValue) => {
	const dictTypeTree = tool.dictDataAll()
	if (!dictTypeTree) {
		return []
	}
	const tree = dictTypeTree.find((item) => item.dictValue === dictValue)
	if (tree && tree.children) {
		return tree.children
	}
	return []
}

/**
 * 生成UUID
 *
 * @author yubaoshan
 * @date 2022-05-18 22:59
 */
tool.snowyUuid = () => {
	let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
		let r = (Math.random() * 16) | 0,
			v = c === 'x' ? r : (r & 0x3) | 0x8
		return v.toString(16)
	})
	// 首字符转换成字母
	return 'xn' + uuid.slice(2)
}

export default tool
