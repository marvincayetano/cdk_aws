"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HitCounter = void 0;
const lambda = require("aws-cdk-lib/aws-lambda");
const dynamodb = require("aws-cdk-lib/aws-dynamodb");
const constructs_1 = require("constructs");
class HitCounter extends constructs_1.Construct {
    constructor(scope, id, props) {
        var _a;
        if (props.readCapacity !== undefined &&
            (props.readCapacity < 5 || props.readCapacity > 20)) {
            throw new Error("readCapacity must be greater than 5 and less than 20");
        }
        super(scope, id);
        const table = new dynamodb.Table(this, "Hits", {
            partitionKey: { name: "path", type: dynamodb.AttributeType.STRING },
            encryption: dynamodb.TableEncryption.AWS_MANAGED,
            readCapacity: (_a = props.readCapacity) !== null && _a !== void 0 ? _a : 5,
        });
        this.table = table;
        this.handler = new lambda.Function(this, "HitCounterHandler", {
            runtime: lambda.Runtime.NODEJS_14_X,
            handler: "hitcounter.handler",
            code: lambda.Code.fromAsset("lambda"),
            environment: {
                DOWNSTREAM_FUNCTION_NAME: props.downstream.functionName,
                HITS_TABLE_NAME: table.tableName,
            },
        });
        // grant the lambda role read/write permissions to our table
        table.grantReadWriteData(this.handler);
        // grant the lambda role invoke permissions to the downstream function
        props.downstream.grantInvoke(this.handler);
    }
}
exports.HitCounter = HitCounter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGl0Y291bnRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImhpdGNvdW50ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsaURBQWlEO0FBQ2pELHFEQUFxRDtBQUNyRCwyQ0FBdUM7QUFnQnZDLE1BQWEsVUFBVyxTQUFRLHNCQUFTO0lBT3ZDLFlBQVksS0FBZ0IsRUFBRSxFQUFVLEVBQUUsS0FBc0I7O1FBQzlELElBQ0UsS0FBSyxDQUFDLFlBQVksS0FBSyxTQUFTO1lBQ2hDLENBQUMsS0FBSyxDQUFDLFlBQVksR0FBRyxDQUFDLElBQUksS0FBSyxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUMsRUFDbkQ7WUFDQSxNQUFNLElBQUksS0FBSyxDQUFDLHNEQUFzRCxDQUFDLENBQUM7U0FDekU7UUFFRCxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBRWpCLE1BQU0sS0FBSyxHQUFHLElBQUksUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFO1lBQzdDLFlBQVksRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFFO1lBQ25FLFVBQVUsRUFBRSxRQUFRLENBQUMsZUFBZSxDQUFDLFdBQVc7WUFDaEQsWUFBWSxRQUFFLEtBQUssQ0FBQyxZQUFZLG1DQUFJLENBQUM7U0FDdEMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFFbkIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLG1CQUFtQixFQUFFO1lBQzVELE9BQU8sRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVc7WUFDbkMsT0FBTyxFQUFFLG9CQUFvQjtZQUM3QixJQUFJLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDO1lBQ3JDLFdBQVcsRUFBRTtnQkFDWCx3QkFBd0IsRUFBRSxLQUFLLENBQUMsVUFBVSxDQUFDLFlBQVk7Z0JBQ3ZELGVBQWUsRUFBRSxLQUFLLENBQUMsU0FBUzthQUNqQztTQUNGLENBQUMsQ0FBQztRQUVILDREQUE0RDtRQUM1RCxLQUFLLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRXZDLHNFQUFzRTtRQUN0RSxLQUFLLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDN0MsQ0FBQztDQUNGO0FBeENELGdDQXdDQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGNkayBmcm9tIFwiYXdzLWNkay1saWJcIjtcbmltcG9ydCAqIGFzIGxhbWJkYSBmcm9tIFwiYXdzLWNkay1saWIvYXdzLWxhbWJkYVwiO1xuaW1wb3J0ICogYXMgZHluYW1vZGIgZnJvbSBcImF3cy1jZGstbGliL2F3cy1keW5hbW9kYlwiO1xuaW1wb3J0IHsgQ29uc3RydWN0IH0gZnJvbSBcImNvbnN0cnVjdHNcIjtcblxuZXhwb3J0IGludGVyZmFjZSBIaXRDb3VudGVyUHJvcHMge1xuICAvKiogdGhlIGZ1bmN0aW9uIGZvciB3aGljaCB3ZSB3YW50IHRvIGNvdW50IHVybCBoaXRzICoqL1xuICBkb3duc3RyZWFtOiBsYW1iZGEuSUZ1bmN0aW9uO1xuXG4gIC8qKlxuICAgKiBUaGUgcmVhZCBjYXBhY2l0eSB1bml0cyBmb3IgdGhlIHRhYmxlXG4gICAqXG4gICAqIE11c3QgYmUgZ3JlYXRlciB0aGFuIDUgYW5kIGxvd2VyIHRoYW4gMjBcbiAgICpcbiAgICogQGRlZmF1bHQgNVxuICAgKi9cbiAgcmVhZENhcGFjaXR5PzogbnVtYmVyO1xufVxuXG5leHBvcnQgY2xhc3MgSGl0Q291bnRlciBleHRlbmRzIENvbnN0cnVjdCB7XG4gIC8qKiBhbGxvd3MgYWNjZXNzaW5nIHRoZSBjb3VudGVyIGZ1bmN0aW9uICovXG4gIHB1YmxpYyByZWFkb25seSBoYW5kbGVyOiBsYW1iZGEuRnVuY3Rpb247XG5cbiAgLyoqIHRoZSBoaXQgY291bnRlciB0YWJsZSAqL1xuICBwdWJsaWMgcmVhZG9ubHkgdGFibGU6IGR5bmFtb2RiLlRhYmxlO1xuXG4gIGNvbnN0cnVjdG9yKHNjb3BlOiBDb25zdHJ1Y3QsIGlkOiBzdHJpbmcsIHByb3BzOiBIaXRDb3VudGVyUHJvcHMpIHtcbiAgICBpZiAoXG4gICAgICBwcm9wcy5yZWFkQ2FwYWNpdHkgIT09IHVuZGVmaW5lZCAmJlxuICAgICAgKHByb3BzLnJlYWRDYXBhY2l0eSA8IDUgfHwgcHJvcHMucmVhZENhcGFjaXR5ID4gMjApXG4gICAgKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJyZWFkQ2FwYWNpdHkgbXVzdCBiZSBncmVhdGVyIHRoYW4gNSBhbmQgbGVzcyB0aGFuIDIwXCIpO1xuICAgIH1cblxuICAgIHN1cGVyKHNjb3BlLCBpZCk7XG5cbiAgICBjb25zdCB0YWJsZSA9IG5ldyBkeW5hbW9kYi5UYWJsZSh0aGlzLCBcIkhpdHNcIiwge1xuICAgICAgcGFydGl0aW9uS2V5OiB7IG5hbWU6IFwicGF0aFwiLCB0eXBlOiBkeW5hbW9kYi5BdHRyaWJ1dGVUeXBlLlNUUklORyB9LFxuICAgICAgZW5jcnlwdGlvbjogZHluYW1vZGIuVGFibGVFbmNyeXB0aW9uLkFXU19NQU5BR0VELFxuICAgICAgcmVhZENhcGFjaXR5OiBwcm9wcy5yZWFkQ2FwYWNpdHkgPz8gNSxcbiAgICB9KTtcbiAgICB0aGlzLnRhYmxlID0gdGFibGU7XG5cbiAgICB0aGlzLmhhbmRsZXIgPSBuZXcgbGFtYmRhLkZ1bmN0aW9uKHRoaXMsIFwiSGl0Q291bnRlckhhbmRsZXJcIiwge1xuICAgICAgcnVudGltZTogbGFtYmRhLlJ1bnRpbWUuTk9ERUpTXzE0X1gsXG4gICAgICBoYW5kbGVyOiBcImhpdGNvdW50ZXIuaGFuZGxlclwiLFxuICAgICAgY29kZTogbGFtYmRhLkNvZGUuZnJvbUFzc2V0KFwibGFtYmRhXCIpLFxuICAgICAgZW52aXJvbm1lbnQ6IHtcbiAgICAgICAgRE9XTlNUUkVBTV9GVU5DVElPTl9OQU1FOiBwcm9wcy5kb3duc3RyZWFtLmZ1bmN0aW9uTmFtZSxcbiAgICAgICAgSElUU19UQUJMRV9OQU1FOiB0YWJsZS50YWJsZU5hbWUsXG4gICAgICB9LFxuICAgIH0pO1xuXG4gICAgLy8gZ3JhbnQgdGhlIGxhbWJkYSByb2xlIHJlYWQvd3JpdGUgcGVybWlzc2lvbnMgdG8gb3VyIHRhYmxlXG4gICAgdGFibGUuZ3JhbnRSZWFkV3JpdGVEYXRhKHRoaXMuaGFuZGxlcik7XG5cbiAgICAvLyBncmFudCB0aGUgbGFtYmRhIHJvbGUgaW52b2tlIHBlcm1pc3Npb25zIHRvIHRoZSBkb3duc3RyZWFtIGZ1bmN0aW9uXG4gICAgcHJvcHMuZG93bnN0cmVhbS5ncmFudEludm9rZSh0aGlzLmhhbmRsZXIpO1xuICB9XG59XG4iXX0=