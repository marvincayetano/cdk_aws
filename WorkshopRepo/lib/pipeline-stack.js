"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkshopPipelineStack = void 0;
const cdk = require("aws-cdk-lib");
const codecommit = require("aws-cdk-lib/aws-codecommit");
const pipelines_1 = require("aws-cdk-lib/pipelines");
class WorkshopPipelineStack extends cdk.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        // Creates a CodeCommit repository called 'WorkshopRepo'
        const repo = new codecommit.Repository(this, "WorkshopRepo", {
            repositoryName: "WorkshopRepo",
        });
        // Pipeline code goes here
        // The basic pipeline declaration. This sets the initial structure
        // of our pipeline
        const pipeline = new pipelines_1.CodePipeline(this, "Pipeline", {
            pipelineName: "WorkshopPipeline",
            synth: new pipelines_1.CodeBuildStep("SynthStep", {
                input: pipelines_1.CodePipelineSource.codeCommit(repo, "master"),
                installCommands: ["npm install -g aws-cdk"],
                commands: ["npm ci", "npm run build", "npx cdk synth"],
            }),
        });
    }
}
exports.WorkshopPipelineStack = WorkshopPipelineStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlwZWxpbmUtc3RhY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwaXBlbGluZS1zdGFjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxtQ0FBbUM7QUFDbkMseURBQXlEO0FBRXpELHFEQUkrQjtBQUUvQixNQUFhLHFCQUFzQixTQUFRLEdBQUcsQ0FBQyxLQUFLO0lBQ2xELFlBQVksS0FBZ0IsRUFBRSxFQUFVLEVBQUUsS0FBc0I7UUFDOUQsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFeEIsd0RBQXdEO1FBQ3hELE1BQU0sSUFBSSxHQUFHLElBQUksVUFBVSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsY0FBYyxFQUFFO1lBQzNELGNBQWMsRUFBRSxjQUFjO1NBQy9CLENBQUMsQ0FBQztRQUVILDBCQUEwQjtRQUMxQixrRUFBa0U7UUFDbEUsa0JBQWtCO1FBQ2xCLE1BQU0sUUFBUSxHQUFHLElBQUksd0JBQVksQ0FBQyxJQUFJLEVBQUUsVUFBVSxFQUFFO1lBQ2xELFlBQVksRUFBRSxrQkFBa0I7WUFDaEMsS0FBSyxFQUFFLElBQUkseUJBQWEsQ0FBQyxXQUFXLEVBQUU7Z0JBQ3BDLEtBQUssRUFBRSw4QkFBa0IsQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQztnQkFDcEQsZUFBZSxFQUFFLENBQUMsd0JBQXdCLENBQUM7Z0JBQzNDLFFBQVEsRUFBRSxDQUFDLFFBQVEsRUFBRSxlQUFlLEVBQUUsZUFBZSxDQUFDO2FBQ3ZELENBQUM7U0FDSCxDQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0Y7QUFyQkQsc0RBcUJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgY2RrIGZyb20gXCJhd3MtY2RrLWxpYlwiO1xuaW1wb3J0ICogYXMgY29kZWNvbW1pdCBmcm9tIFwiYXdzLWNkay1saWIvYXdzLWNvZGVjb21taXRcIjtcbmltcG9ydCB7IENvbnN0cnVjdCB9IGZyb20gXCJjb25zdHJ1Y3RzXCI7XG5pbXBvcnQge1xuICBDb2RlQnVpbGRTdGVwLFxuICBDb2RlUGlwZWxpbmUsXG4gIENvZGVQaXBlbGluZVNvdXJjZSxcbn0gZnJvbSBcImF3cy1jZGstbGliL3BpcGVsaW5lc1wiO1xuXG5leHBvcnQgY2xhc3MgV29ya3Nob3BQaXBlbGluZVN0YWNrIGV4dGVuZHMgY2RrLlN0YWNrIHtcbiAgY29uc3RydWN0b3Ioc2NvcGU6IENvbnN0cnVjdCwgaWQ6IHN0cmluZywgcHJvcHM/OiBjZGsuU3RhY2tQcm9wcykge1xuICAgIHN1cGVyKHNjb3BlLCBpZCwgcHJvcHMpO1xuXG4gICAgLy8gQ3JlYXRlcyBhIENvZGVDb21taXQgcmVwb3NpdG9yeSBjYWxsZWQgJ1dvcmtzaG9wUmVwbydcbiAgICBjb25zdCByZXBvID0gbmV3IGNvZGVjb21taXQuUmVwb3NpdG9yeSh0aGlzLCBcIldvcmtzaG9wUmVwb1wiLCB7XG4gICAgICByZXBvc2l0b3J5TmFtZTogXCJXb3Jrc2hvcFJlcG9cIixcbiAgICB9KTtcblxuICAgIC8vIFBpcGVsaW5lIGNvZGUgZ29lcyBoZXJlXG4gICAgLy8gVGhlIGJhc2ljIHBpcGVsaW5lIGRlY2xhcmF0aW9uLiBUaGlzIHNldHMgdGhlIGluaXRpYWwgc3RydWN0dXJlXG4gICAgLy8gb2Ygb3VyIHBpcGVsaW5lXG4gICAgY29uc3QgcGlwZWxpbmUgPSBuZXcgQ29kZVBpcGVsaW5lKHRoaXMsIFwiUGlwZWxpbmVcIiwge1xuICAgICAgcGlwZWxpbmVOYW1lOiBcIldvcmtzaG9wUGlwZWxpbmVcIixcbiAgICAgIHN5bnRoOiBuZXcgQ29kZUJ1aWxkU3RlcChcIlN5bnRoU3RlcFwiLCB7XG4gICAgICAgIGlucHV0OiBDb2RlUGlwZWxpbmVTb3VyY2UuY29kZUNvbW1pdChyZXBvLCBcIm1hc3RlclwiKSxcbiAgICAgICAgaW5zdGFsbENvbW1hbmRzOiBbXCJucG0gaW5zdGFsbCAtZyBhd3MtY2RrXCJdLFxuICAgICAgICBjb21tYW5kczogW1wibnBtIGNpXCIsIFwibnBtIHJ1biBidWlsZFwiLCBcIm5weCBjZGsgc3ludGhcIl0sXG4gICAgICB9KSxcbiAgICB9KTtcbiAgfVxufVxuIl19