package com.wu.demo.fileupload.demo.bean;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name="Response")
public class BasicResponse<T>
{
  private String code;
  private String message;
  private T content;
  public static final String CODE_SUCCESS = "0";
  public static final String CODE_WARN = "2";
  public static final String CODE_SERVER_ERROR = "-1";
  public static final String THE_LAST_PAGE = "999";
  public static final String CODE_USER_INEXISTENCE = "1001";
  public static final String CODE_USER_PWD_ERROR = "1002";
  public static final String CODE_USER_PWD_NULL = "1003";
  public static final String CODE_USER_USERNAME_EXIST = "1004";
  public static final String CODE_USER_EMAIL_EXIST = "1005";
  public static final String CODE_USER_OLDPWD_NULL = "1006";
  public static final String CODE_USER_OLDPWD_REEOR = "1007";
  public static final String CODE_USER_MOBIE_INEXISTENCE = "1008";
  public static final String CODE_USER_USERNAMELOGIN_EXIST = "1009";
  public static final String CODE_USER_EMAILLOGIN_EXIST = "1010";
  public static final String CODE_USER_MOBIELOGIN_EXIST = "1011";
  public static final String CODE_USER_EMAIL_INEXISTENCE = "1012";
  public static final String CDOE_USER_REGISTLINK_ERROR = "1013";
  public static final String CODE_PACCOUNT_INEXISTENCE = "1101";
  public static final String CODE_PACCOUNTLIST_INEXISTENCE = "1102";
  public static final String CODE_PACCOUNT_ISRELATED = "1103";
  public static final String CODE_PACCOUNT_EXIST = "1104";
  public static final String CODE_PACCOUNT_NOTRELATED_EXIST = "1105";
  public static final String CODE_FGROUP_EXIST = "1201";
  public static final String CODE_FGROUP_FIND = "1202";
  public static final String CODE_IDENTIFYCODE_INEXISTENCE = "1301";
  public static final String CODE_IDENTIFYCODE_DISAGREE = "1302";
  public static final String CODE_IDENTIFYCODE_OVERDUE = "1303";
  public static final String CODE_COLLECTTYPE_EXIST = "1401";
  public static final String CODE_COLLECTTYPE_INEXISTENCE = "1402";
  public static final String CODE_COLLECTTYPELIST_INEXISTENCE = "1403";
  public static final String CODE_FRIENDS_INEXIT = "1501";
  public static final String CODE_FRIENDS_FRIENDEXIT = "1502";
  public static final String CODE_FRIENDS_MOVECOUNT = "1503";
  public static final String CODE_THIRD_SERVER_ERROR = "1601";
  public static final String CODE_SERVER_RETURN_PACCOUNT_ERROR = "1602";
  public static final String CODE_SERVER_RETURN_CONTENT_ERROR = "1603";
  public static final String CODE_SERVER_RETURN_COLLECT_ERROR = "1604";
  public static final String CODE_SERVER_RETURN_CONTENTLIST_ERROR = "1605";
  public static final String CODE_SERVER_RETURN_REVIWE_ERROR = "1606";
  public static final String CODE_UPDATE_ERROR = "1071";
  public static final String CODE_COLLECT_INEXISTENCE = "1801";
  public static final String CODE_PRAISE_INEXISTENCE = "1802";
  public static final String CODE_CONTENTLIST_INEXISTENCE = "1803";
  public static final String CODE_CONTENT_INEXISTENCE = "1804";
  public static final String CODE_REVIWE_TEXT_INEXISTENCE = "1805";
  public static final String CODE_TOKEN_RECEIVE_ERROR = "1901";
  public static final String CODE_TOKEN_ERROR = "1902";
  public static final String CODE_VOLIST_INEXISTENCE = "2001";

  public BasicResponse()
  {
  }

  public BasicResponse(String code)
  {
    this.code = code;
  }

  public BasicResponse(String code, T content)
  {
    this.code = code;
    this.content = content;
  }
  public BasicResponse(String code,String message ,T content)
  {
    this.code = code;
    this.message = message;
    this.content = content;
  }
  
  public String getMessage() {
	return message;
}

public void setMessage(String message) {
	this.message = message;
}

public String getCode() {
    return this.code;
  }

  public void setCode(String code) {
    this.code = code;
  }

  public T getContent() {
    return this.content;
  }

  public void setContent(T content) {
    this.content = content;
  }
}