package com.wu.demo.fileupload.demo.bean;

import com.wu.demo.fileupload.demo.util.Page;

public class BaseForm<T> {
	private Page<T> pageSource;
	private Integer curPage = 1;
	private Integer rowPerPage = 15;
	private T instance;

	public Page<T> getPageSource() {
		return pageSource;
	}

	public void setPageSource(Page<T> pageSource) {
		this.pageSource = pageSource;
	}

	public Integer getRowPerPage() {
		return rowPerPage;
	}

	public void setRowPerPage(Integer rowPerPage) {
		this.rowPerPage = rowPerPage;
	}

	public Integer getCurPage() {
		return curPage;
	}

	public void setCurPage(Integer curPage) {
		this.curPage = curPage;
	}

	public T getInstance() {
		return instance;
	}

	public void setInstance(T instance) {
		this.instance = instance;
	}
}