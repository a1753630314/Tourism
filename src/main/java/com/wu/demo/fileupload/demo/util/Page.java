package com.wu.demo.fileupload.demo.util;

import java.net.URLEncoder;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.wu.demo.fileupload.demo.bean.PostForm;


public class Page<T> {
	private String pageStr;
	private List<T> source;
	public static final String PAGE_PARAM_NAME = "curPage";
	public static final String PAGESIZE_PARAM_NAME = "rowPerPage";
	private int curPage;
	private int pageCount;
	private int rowsPerPage;
	private int rowCount;
	private Object[][] params;
	private String url;

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public List<T> getSource() {
		return source;
	}

	private void setSource(List<T> source) {
		this.source = source;
	}

	public int getPageCount() {
		return pageCount;
	}

	public void setPageCount(int pageCount) {
		this.pageCount = pageCount;
	}

	public int getRowsPerPage() {
		return rowsPerPage;
	}

	private void setRowsPerPage(int rowsPerPage) {
		this.rowsPerPage = rowsPerPage;
	}

	private void setPageStr(String pageStr) {
		this.pageStr = pageStr;
	}

	/**
	 * 单页显示全部内容
	 * 
	 * @param source
	 */
	public Page(List<T> source ) {
		this.source = source;
		this.setCurPage(1);
		this.setRowsPerPage(source.size());
		this.setRowCount(source.size());
		this.setPageCount(1);
//		this.setPageCount(this.rowCount % this.rowsPerPage == 0 ? this.rowCount / this.rowsPerPage : this.rowCount / this.rowsPerPage + 1);
//		this.url = ServletActionContext.getRequest().getRequestURI();
//		this.url = request.getRequestURI();
//		this.url = getUrl(request);
	}

	/**
	 * 分页构造函数
	 * 
	 * @param source
	 *            分页内容
	 * @param curPage
	 *            当前页
	 * @param rowCountPerPage
	 *            总页数
	 * @param rowcount
	 *            总记录数
	 */
	public Page(List<T> source, int curPage, int rowCountPerPage, int rowcount) {
		this.source = source;
		this.setCurPage(curPage);
		this.setRowsPerPage(rowCountPerPage);
		this.setRowCount(rowcount);
		this.setPageCount(rowcount % rowCountPerPage == 0 ? rowcount
				/ rowCountPerPage : rowcount / rowCountPerPage + 1);
//		this.url = getUrl(request);
	}

	public void setParams(Object[][] params) {
		this.params = params;
	}
	 public String getUrl(HttpServletRequest request) {
		 String url = "";
			url = request.getScheme() +"://" + request.getServerName()  
	                        + ":" +request.getServerPort() 
	                        + request.getServletPath();
			if (request.getQueryString() != null){
				url += "?" + request.getQueryString();
			}
			return url;
	 }
	public String getPageStr() {
		String pageStr;
		String u = url + "?";
		if (params != null) {
			for (int i = 0; i < params.length; i++) {
				try {
					u += params[i][0]
							+ "="
							+ ((params[i][1] == null) ? "" : URLEncoder.encode(
									params[i][1].toString(), "utf-8")) + "&";
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		}
		pageStr = "共" + this.getRowCount() + "条记录&nbsp;&nbsp;" + pageCount
				+ "页";
		pageStr += "&nbsp;每页<input type='text' class='numberInput' style='width:25px;' maxlength=3 id='pagetion_pagesize' value='"
				+ this.rowsPerPage + "'/>";
		pageStr += "<input type='button' value='GO' onclick='pagesizeChanged()'/>";
		pageStr += "&nbsp;&nbsp;当前为第" + this.getCurPage() + "页";
		if (curPage != 1) {
			pageStr += "&nbsp;&nbsp;<a href='" + u + PAGE_PARAM_NAME + "="
					+ (curPage - 1) + "&rowPerPage=" + this.getRowsPerPage()
					+ "'>上一页</a>";
		} else {
			pageStr += "&nbsp;&nbsp;<span style='color:#333333;'>上一页</span>";
		}
		if (curPage < this.getPageCount()) {
			pageStr += "&nbsp;&nbsp;<a href='" + u + PAGE_PARAM_NAME + "="
					+ (curPage + 1) + "&rowPerPage=" + this.getRowsPerPage()
					+ "'>下一页</a>";
		} else {
			pageStr += "&nbsp;&nbsp;<span style='color:#333333;'>下一页</span>";
		}
		pageStr += "&nbsp;&nbsp;<select onchange='window.location.href=this.value'>";
		for (int i = 1; i <= this.getPageCount(); i++) {
			if (i == curPage) {
				pageStr += "<option selected value='" + u + PAGE_PARAM_NAME
						+ "=" + i + "&rowPerPage=" + this.getRowsPerPage()
						+ "'>第" + i + "页</option>";
			} else {
				pageStr += "<option value='" + u + PAGE_PARAM_NAME + "=" + i
						+ "&rowPerPage=" + this.getRowsPerPage() + "'>第" + i
						+ "页</option>";
			}
		}
		pageStr += "</select>";
		String js = "<script type='text/javascript'>";
		js += "var pagetion_u='" + u + "';";
		js += "var pagetion_url;";
		js += "function pagesizeChanged(){if(/^\\d{1,3}$/.test(document.getElementById('pagetion_pagesize').value)&&parseInt(document.getElementById('pagetion_pagesize').value)>0){"
				+ "pagetion_url=pagetion_u+'"
				+ this.PAGE_PARAM_NAME
				+ "=1&"
				+ this.PAGESIZE_PARAM_NAME
				+ "='+document.getElementById('pagetion_pagesize').value;"
				+ "}else{"
				+ "pagetion_url=pagetion_u+'"
				+ this.PAGE_PARAM_NAME
				+ "=1&"
				+ this.PAGESIZE_PARAM_NAME
				+ "="
				+ this.rowsPerPage
				+ "';" + "}" + "window.location.href=pagetion_url;}";
		js += "</script>";
		pageStr += js;
		return pageStr;
	}

	public int getRowCount() {
		return rowCount;
	}

	public void setRowCount(int rowCount) {
		this.rowCount = rowCount;
	}

	public int getCurPage() {
		return curPage;
	}

	public void setCurPage(int curPage) {
		this.curPage = curPage;
	}
	
	public static int strartLine(PostForm form) {
		int pageSize = ((form.getCurPage() != null
				&& form.getCurPage() > 0 ? form.getCurPage() : 1) - 1);
		int curPage = pageSize * form.getRowPerPage();
		return curPage;
	}
	public static int endLine(PostForm form) {
//		int pageSize = ((form.getCurPage() != null
//				&& form.getCurPage() > 0 ? form.getCurPage() : 1) );
//		int curPage = pageSize * form.getRowPerPage();
		return form.getRowPerPage();
	}
}
