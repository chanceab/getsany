try{let e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},t=(new e.Error).stack;t&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[t]="392a4903-e4c3-4ea9-b671-03ba881058cd",e._sentryDebugIdIdentifier="sentry-dbid-392a4903-e4c3-4ea9-b671-03ba881058cd")}catch(e){}"use strict";exports.id=380,exports.ids=[380],exports.modules={73380:(e,t,a)=>{a.d(t,{clerkDevelopmentCache:()=>i,createConfirmationMessage:()=>r,createKeylessModeMessage:()=>n});var s=a(78596);let n=e=>`
\x1b[35m
[Clerk]:\x1b[0m You are running in keyless mode.
You can \x1b[35mclaim your keys\x1b[0m by visiting ${e.claimUrl}
`,r=()=>`
\x1b[35m
[Clerk]:\x1b[0m Your application is running with your claimed keys.
You can safely remove the \x1b[35m.clerk/\x1b[0m from your project.
`,i=function(){if((0,s.b_)())return global.__clerk_internal_keyless_logger||(global.__clerk_internal_keyless_logger={__cache:new Map,log:function({cacheKey:e,msg:t}){var a;this.__cache.has(e)&&Date.now()<((null==(a=this.__cache.get(e))?void 0:a.expiresAt)||0)||(console.log(t),this.__cache.set(e,{expiresAt:Date.now()+6e5}))},run:async function(e,{cacheKey:t,onSuccessStale:a=6e5,onErrorStale:s=6e5}){var n,r;if(this.__cache.has(t)&&Date.now()<((null==(n=this.__cache.get(t))?void 0:n.expiresAt)||0))return null==(r=this.__cache.get(t))?void 0:r.data;try{let s=await e();return this.__cache.set(t,{expiresAt:Date.now()+a,data:s}),s}catch(e){throw this.__cache.set(t,{expiresAt:Date.now()+s}),e}}}),globalThis.__clerk_internal_keyless_logger}()}};
//# sourceMappingURL=380.js.map