﻿using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.EntityFrameworkCore;
using CTFServer.Models;
using CTFServer.Utils;
using NLog;
using System.Security.Claims;

namespace CTFServer.Middlewares;

/// <summary>
/// 需要权限访问
/// </summary>
[AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
public class RequirePrivilegeAttribute : Attribute, IAsyncAuthorizationFilter
{
    /// <summary>
    /// 所需权限
    /// </summary>
    private readonly Role RequiredPrivilege;

    private static readonly Logger logger = LogManager.GetLogger("Authorization");

    public RequirePrivilegeAttribute(Role privilege)
        => RequiredPrivilege = privilege;

    public async Task OnAuthorizationAsync(AuthorizationFilterContext context)
    {
        /*var userManager = context.HttpContext.RequestServices.GetRequiredService<UserManager<UserInfo>>();
        var user = await userManager.GetUserAsync(context.HttpContext.User);

        if (user is null)
        {
            var result = new JsonResult(new RequestResponse("请先登录", 401))
            {
                StatusCode = 401
            };
            context.Result = result;
            return;
        }

        user.UpdateByHttpContext(context.HttpContext);
        await userManager.UpdateAsync(user);

        if (user.Role < RequiredPrivilege)
        {
            LogHelper.Log(logger, $"尝试访问未经授权的接口 {context.HttpContext.Request.Path}", user, TaskStatus.Denied);
            var result = new JsonResult(new RequestResponse("无权访问", 403))
            {
                StatusCode = 403
            };
            context.Result = result;
        }*/
    }
}

/// <summary>
/// 需要已登录用户权限
/// </summary>
public class RequireSignedInAttribute : RequirePrivilegeAttribute
{
    public RequireSignedInAttribute() : base(Role.User)
    {
    }
}

/// <summary>
/// 需要监控者权限
/// </summary>
public class RequireMonitorAttribute : RequirePrivilegeAttribute
{
    public RequireMonitorAttribute() : base(Role.Monitor)
    {
    }
}

/// <summary>
/// 需要Admin权限
/// </summary>
public class RequireAdminAttribute : RequirePrivilegeAttribute
{
    public RequireAdminAttribute() : base(Role.Admin)
    {
    }
}
