package com.whty.euicc.profile.cdmaParameter.bean;

import com.whty.euicc.profile.parent.JavaBean;
/**
 * CdmaParameter子元素
 * 结构类型：简单类型
 * @author Administrator
 *
 */
public class AuthenticationKey extends JavaBean{
	private String tag = "81";

	public String getTag() {
		return tag;
	}

	public void setTag(String tag) {
		this.tag = tag;
	}
	
	
}
