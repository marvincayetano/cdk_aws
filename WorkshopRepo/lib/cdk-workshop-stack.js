"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CdkWorkshopStack = void 0;
const aws_cdk_lib_1 = require("aws-cdk-lib");
const lambda = require("aws-cdk-lib/aws-lambda");
const apigw = require("aws-cdk-lib/aws-apigateway");
const hitcounter_1 = require("./hitcounter");
const cdk_dynamo_table_viewer_1 = require("cdk-dynamo-table-viewer");
class CdkWorkshopStack extends aws_cdk_lib_1.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        // defines an AWS Lambda Resource
        const hello = new lambda.Function(this, "HelloHandler", {
            runtime: lambda.Runtime.NODEJS_14_X,
            code: lambda.Code.fromAsset("lambda"),
            handler: "hello.handler",
            environment: {
                DOWNSTREAM_FUNCTION_NAME: props.downstream.functionName,
                HITS_TABLE_NAME: table.tableName,
            },
        });
        const helloWithCounter = new hitcounter_1.HitCounter(this, "HelloHitCounter", {
            downstream: hello,
        });
        // API Gateway REST API for our hello
        new apigw.LambdaRestApi(this, "Endpoint", {
            handler: helloWithCounter.handler,
        });
        new cdk_dynamo_table_viewer_1.TableViewer(this, "ViewHitCounter", {
            title: "Hello Hits",
            table: helloWithCounter.table,
        });
    }
}
exports.CdkWorkshopStack = CdkWorkshopStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2RrLXdvcmtzaG9wLXN0YWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY2RrLXdvcmtzaG9wLXN0YWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDZDQUFnRDtBQUVoRCxpREFBaUQ7QUFDakQsb0RBQW9EO0FBQ3BELDZDQUEwQztBQUMxQyxxRUFBc0Q7QUFFdEQsTUFBYSxnQkFBaUIsU0FBUSxtQkFBSztJQUN6QyxZQUFZLEtBQWdCLEVBQUUsRUFBVSxFQUFFLEtBQWtCO1FBQzFELEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRXhCLGlDQUFpQztRQUNqQyxNQUFNLEtBQUssR0FBRyxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLGNBQWMsRUFBRTtZQUN0RCxPQUFPLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxXQUFXO1lBQ25DLElBQUksRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUM7WUFDckMsT0FBTyxFQUFFLGVBQWU7WUFDeEIsV0FBVyxFQUFFO2dCQUNYLHdCQUF3QixFQUFFLEtBQUssQ0FBQyxVQUFVLENBQUMsWUFBWTtnQkFDdkQsZUFBZSxFQUFFLEtBQUssQ0FBQyxTQUFTO2FBQ2pDO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsTUFBTSxnQkFBZ0IsR0FBRyxJQUFJLHVCQUFVLENBQUMsSUFBSSxFQUFFLGlCQUFpQixFQUFFO1lBQy9ELFVBQVUsRUFBRSxLQUFLO1NBQ2xCLENBQUMsQ0FBQztRQUVILHFDQUFxQztRQUNyQyxJQUFJLEtBQUssQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLFVBQVUsRUFBRTtZQUN4QyxPQUFPLEVBQUUsZ0JBQWdCLENBQUMsT0FBTztTQUNsQyxDQUFDLENBQUM7UUFFSCxJQUFJLHFDQUFXLENBQUMsSUFBSSxFQUFFLGdCQUFnQixFQUFFO1lBQ3RDLEtBQUssRUFBRSxZQUFZO1lBQ25CLEtBQUssRUFBRSxnQkFBZ0IsQ0FBQyxLQUFLO1NBQzlCLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FDRjtBQTdCRCw0Q0E2QkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTdGFjaywgU3RhY2tQcm9wcyB9IGZyb20gXCJhd3MtY2RrLWxpYlwiO1xuaW1wb3J0IHsgQ29uc3RydWN0IH0gZnJvbSBcImNvbnN0cnVjdHNcIjtcbmltcG9ydCAqIGFzIGxhbWJkYSBmcm9tIFwiYXdzLWNkay1saWIvYXdzLWxhbWJkYVwiO1xuaW1wb3J0ICogYXMgYXBpZ3cgZnJvbSBcImF3cy1jZGstbGliL2F3cy1hcGlnYXRld2F5XCI7XG5pbXBvcnQgeyBIaXRDb3VudGVyIH0gZnJvbSBcIi4vaGl0Y291bnRlclwiO1xuaW1wb3J0IHsgVGFibGVWaWV3ZXIgfSBmcm9tIFwiY2RrLWR5bmFtby10YWJsZS12aWV3ZXJcIjtcblxuZXhwb3J0IGNsYXNzIENka1dvcmtzaG9wU3RhY2sgZXh0ZW5kcyBTdGFjayB7XG4gIGNvbnN0cnVjdG9yKHNjb3BlOiBDb25zdHJ1Y3QsIGlkOiBzdHJpbmcsIHByb3BzPzogU3RhY2tQcm9wcykge1xuICAgIHN1cGVyKHNjb3BlLCBpZCwgcHJvcHMpO1xuXG4gICAgLy8gZGVmaW5lcyBhbiBBV1MgTGFtYmRhIFJlc291cmNlXG4gICAgY29uc3QgaGVsbG8gPSBuZXcgbGFtYmRhLkZ1bmN0aW9uKHRoaXMsIFwiSGVsbG9IYW5kbGVyXCIsIHtcbiAgICAgIHJ1bnRpbWU6IGxhbWJkYS5SdW50aW1lLk5PREVKU18xNF9YLCAvLyBFeGVjdXRpb24gRW52aXJvbm1lbnQgLSBCYXNpY2FsbHkgd2hhdCBydW5zIHRoZSBjb2RlXG4gICAgICBjb2RlOiBsYW1iZGEuQ29kZS5mcm9tQXNzZXQoXCJsYW1iZGFcIiksIC8vIENvZGUgaW5zaWRlIHRoZSBsYW1iZGEgZm9sZGVyXG4gICAgICBoYW5kbGVyOiBcImhlbGxvLmhhbmRsZXJcIiwgLy8gTmFtZSBvZiB0aGUgZmlsZSBmdW5jdGlvbiBpbnNpZGUgdGhlIGxhbWJkYSBmb2xkZXIgZmlsZVxuICAgICAgZW52aXJvbm1lbnQ6IHtcbiAgICAgICAgRE9XTlNUUkVBTV9GVU5DVElPTl9OQU1FOiBwcm9wcy5kb3duc3RyZWFtLmZ1bmN0aW9uTmFtZSxcbiAgICAgICAgSElUU19UQUJMRV9OQU1FOiB0YWJsZS50YWJsZU5hbWUsXG4gICAgICB9LFxuICAgIH0pO1xuXG4gICAgY29uc3QgaGVsbG9XaXRoQ291bnRlciA9IG5ldyBIaXRDb3VudGVyKHRoaXMsIFwiSGVsbG9IaXRDb3VudGVyXCIsIHtcbiAgICAgIGRvd25zdHJlYW06IGhlbGxvLFxuICAgIH0pO1xuXG4gICAgLy8gQVBJIEdhdGV3YXkgUkVTVCBBUEkgZm9yIG91ciBoZWxsb1xuICAgIG5ldyBhcGlndy5MYW1iZGFSZXN0QXBpKHRoaXMsIFwiRW5kcG9pbnRcIiwge1xuICAgICAgaGFuZGxlcjogaGVsbG9XaXRoQ291bnRlci5oYW5kbGVyLFxuICAgIH0pO1xuXG4gICAgbmV3IFRhYmxlVmlld2VyKHRoaXMsIFwiVmlld0hpdENvdW50ZXJcIiwge1xuICAgICAgdGl0bGU6IFwiSGVsbG8gSGl0c1wiLFxuICAgICAgdGFibGU6IGhlbGxvV2l0aENvdW50ZXIudGFibGUsXG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==