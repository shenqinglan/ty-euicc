package com.whty.euicc.base.dao;

import org.apache.ibatis.annotations.Param;

import com.github.miemiedev.mybatis.paginator.domain.PageBounds;
import com.github.miemiedev.mybatis.paginator.domain.PageList;
import com.whty.euicc.base.pojo.BaseRoleModuleExample;
import com.whty.euicc.base.pojo.BaseRoleModuleKey;

public interface BaseRoleModuleMapper {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table BASE_ROLE_MODULE
     *
     * @mbggenerated Fri Apr 10 11:28:31 CST 2015
     */
    int countByExample(BaseRoleModuleExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table BASE_ROLE_MODULE
     *
     * @mbggenerated Fri Apr 10 11:28:31 CST 2015
     */
    int deleteByExample(BaseRoleModuleExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table BASE_ROLE_MODULE
     *
     * @mbggenerated Fri Apr 10 11:28:31 CST 2015
     */
    int deleteByPrimaryKey(BaseRoleModuleKey key);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table BASE_ROLE_MODULE
     *
     * @mbggenerated Fri Apr 10 11:28:31 CST 2015
     */
    int insert(BaseRoleModuleKey record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table BASE_ROLE_MODULE
     *
     * @mbggenerated Fri Apr 10 11:28:31 CST 2015
     */
    int insertSelective(BaseRoleModuleKey record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table BASE_ROLE_MODULE
     *
     * @mbggenerated Fri Apr 10 11:28:31 CST 2015
     */
    PageList<BaseRoleModuleKey> selectByExample(BaseRoleModuleExample example, PageBounds pageBounds);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table BASE_ROLE_MODULE
     *
     * @mbggenerated Fri Apr 10 11:28:31 CST 2015
     */
    int updateByExampleSelective(@Param("record") BaseRoleModuleKey record, @Param("example") BaseRoleModuleExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table BASE_ROLE_MODULE
     *
     * @mbggenerated Fri Apr 10 11:28:31 CST 2015
     */
    int updateByExample(@Param("record") BaseRoleModuleKey record, @Param("example") BaseRoleModuleExample example);
}